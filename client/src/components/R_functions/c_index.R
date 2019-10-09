paired.concordance.index <- function(predictions, observations, delta.pred=0,
                                     delta.obs=0, alpha = 0.05, outx=FALSE,
                                     alternative = c("two.sided", "less", "greater"),
                                     logic.operator=c("and", "or"),
                                     CPP=TRUE, comppairs=10) {
  alternative <- match.arg(alternative)
  logic.operator <- match.arg(logic.operator)
  predictions[which(is.nan(predictions))] <- NA
  observations[which(is.nan(observations))] <- NA
  cc.ix <- complete.cases(predictions, observations)
  predictions <- predictions[which(cc.ix)]
  observations <- observations[which(cc.ix)]
  if(!CPP){
    logic.operator <- ifelse(logic.operator=="or", "|", "&")
    N <- length(which(cc.ix))
    if(length(delta.pred) == 1){
      delta.pred <- rep(delta.pred, N)
    }else{
      delta.pred <- delta.pred[which(cc.ix)]
    }
    if(length(delta.obs) == 1){
      delta.obs <- rep(delta.obs, N)
    }else{
      delta.obs <- delta.obs[which(cc.ix)]
    }
    c <- d <- u <- matrix(0, nrow = 1, ncol = N)
    c.d.seq <- NULL
    for (i in seq(from = 1, to = N - 1)) {
      for (j in seq(from = i + 1, to = N)) {
        pair <- c(i, j)
        iff <- as.logical(outer(abs(predictions[i] - predictions[j]) >
                                  max(delta.pred[i], delta.pred[j]),
                                abs(observations[i] - observations[j]) >
                                  max(delta.obs[i], delta.obs[j]), logic.operator))
        if(logic.operator == "&"){
          ife <- abs(predictions[i] - predictions[j]) == max(delta.pred[i],
                                                             delta.pred[j])
        }else{
          ife <- !iff
        }
        if(iff){ #add flag to replace 'or' behaviour with 'xor' behaviour
          pp <- (predictions[i] < predictions[j])
          oo <- (observations[i] < observations[j])
          if (pp == oo) {
            c[pair] <- c[pair] + 1
            c.d.seq <- c(c.d.seq, TRUE)
            c.d.seq <- c(c.d.seq, TRUE)
          } else {
            d[pair] <- d[pair] + 1
            c.d.seq <- c(c.d.seq, FALSE)
            c.d.seq <- c(c.d.seq, FALSE)
          }
        }else if (ife){
          if(outx | abs(observations[i] - observations[j]) <= max(delta.obs[i],
                                                                  delta.obs[j])){
            u[pair] <- u[pair] + 1
          }else{
            d[pair] <- d[pair] + 0.5
            c[pair] <- c[pair] + 0.5
            c.d.seq <- c(c.d.seq, TRUE)
            c.d.seq <- c(c.d.seq, FALSE)
          }
        }
      }
    }
    C <- sum(c)
    D <- sum(d)
    CC <- sum(c * (c - 1))
    DD <- sum(d * (d - 1))
    CD <- sum(c * d)
  }else{
    values <- concordanceIndex_modified_helper(x=predictions, y=observations,
                                               deltaX=delta.pred, deltaY=delta.obs,
                                               alpha=alpha, outx=outx,
                                               alternative=alternative,
                                               logicOp=logic.operator)
    C <- values$C
    D <- values$D
    CC <- values$CC
    DD <- values$DD
    CD <- values$CD
    N <- values$N
    c.d.seq <- values$cdseq
  }
  
  if (N < 3 || (C == 0 && D == 0)) {
    return(list("cindex"=NA, "p.value"=NA, "sterr"=NA, "lower"=NA, "upper"=NA,
                "relevant.pairs.no"=0))
  }
  if(C!=0 & D==0){
    return(list("cindex"=1, "p.value"=NA, "sterr"=NA, "lower"=NA, "upper"=NA,
                "relevant.pairs.no"=(C + D) / 2, "concordant.pairs"=c.d.seq))
  }
  if(C==0 || D==0 || C * (C - 1)==0 || D * (D - 1)==0 || C * D==0 || (C + D) <
     comppairs){
    return(list("cindex"=NA, "p.value"=NA, "sterr"=NA, "lower"=NA, "upper"=NA,
                "relevant.pairs.no"=(C + D) / 2, "concordant.pairs"=c.d.seq))
  }
  cindex <- C / (C + D)
  varp <- 4 * ((D ^ 2 * CC - 2 * C * D * CD + C ^ 2 * DD) / (C + D) ^ 4) * N *
    (N - 1) / (N - 2)
  if (varp >= 0) {
    sterr <- sqrt(varp / N)
    ci <- qnorm(p = alpha / 2, lower.tail = FALSE) * sterr
    p <- pnorm((cindex - 0.5) / sterr)
  } else {
    return(list("cindex"=cindex,
                "p.value"=1,
                "sterr"=NA,
                "lower"=0,
                "upper"=0,
                "relevant.pairs.no"=(C + D) / 2,
                "concordant.pairs"=c.d.seq))
  }
  return(cindex)
}