/* eslint-disable linebreak-style */
/* eslint-disable max-len */
import React from 'react';
import styled from 'styled-components';
import colors from '../../styles/colors';
import transitions from '../../styles/transitions';
import searchPath from '../../images/docs/figure03.png';
import synPath from '../../images/docs/figure02.png';
import samplesPath from '../../images/docs/figure04.png';
import compoundsPath from '../../images/docs/figure05.png';
import datasetsPath from '../../images/docs/figure06.png';
import pharmacoPath from '../../images/docs/figure07.png';
import biomarkerPath from '../../images/docs/biomarker.JPG';
import sensitivityPath from '../../images/docs/sensitivity.JPG';
import enrichmentPath from '../../images/docs/enrichment.JPG';
import consistencyPath from '../../images/docs/figure11.png';
import detailedPath from '../../images/docs/figure12.png';
// import GeneralDoc from './Functionality/Overview';
import GeneralFunc from './Functionality/GeneralFunc';
import APIDoc from './APIdocumentation';
import FunctionalDoc from './FunctionalDoc';

const StyledDiv = styled.div`
  padding: 10px;
  width: 100%;
  main {
    display: flex;
    max-width: 1200px;
    padding: 30px;
    text-align: justify;
    font-size: 20px;
    min-height: 80vh;
    &.documentation {
      width: 100%;
      background:white;
      font-family: Nunito Sans, sans-serif;
      color:${colors.nav_links};
      h1, h2 {
        margin: 25px 0;
      }
      span {
        font-size: 20px;
      }
      h2 {
        padding:20px 0px;
      }
    }
    .doc {
        margin-left: 30px;
    }
    nav {
        margin-top: 25px;
        // position: fixed;
        max-width:300px;

        li {
            padding: 10px;
            margin-bottom: 5px;
            border-left: 2px solid ${colors.color_main_2}
            transition: ${transitions.main_trans}

            &.selected {
                border-left:2px solid ${colors.color_main_5}
                button {
                    color: ${colors.color_main_5}
                }
            }
            &.sub-head {
              font-size: 18px;
              margin-left:10px;
              padding: 10px;
              border-left: none;
              font-weight: bold;
            }
            &.sub-func {
              font-size: 15px;
              margin-left:25px;
              padding: 10px;
              border-left: none;
            }
          }
          button {
            border: 0;
            padding: 0;
            background: white;
            color: ${colors.color_main_2}
            outline: none;
            transition: ${transitions.main_trans};
            cursor: pointer;
            text-align:left;
          }
    }
    ol {
      list-style: none;
      padding: 10px 0;
    }
  } 
  footer {
    text-align: center;
    font-size: 20px;
    color: ${colors.color_main_2}
  }
`;

// TODO: must update some of these
// They're not done on the google doc
// const overviewText = '<span><b>SYNERGxDB </b>is a comprehensive database to explore synergistic drug combinations for biomarker discovery.</span><ol><li><b>Overview</b><ol><li>Many studies have highlighted the use of drug combination approaches in the treatment of tumors, which have been shown to provide aid in <b>overcoming cancer treatment failures.</b> However, the impact of genetics on variability in combo responses for discovering predictiveand prognostic biomarkers is currently unknown. To help solve this issue, we created <b>SYNERGxDB</b>, a web-application that possesses the largest database of seven collections of pharmacological and molecular profiles of corresponding cell lines (124 cell lines in 11 tissue types and1,962 drugs/compounds - 15,268 combinations). This application allows researchers and clinicians to identifynovel synergistic drug combinations, in order to discover potential prognostic and predictive biomarkers that can help improvepatient prognosis and selection.</li></ol></li></ol>';
// const overviewPath = '';
// const searchText = '<ol><li><b>Search</b><ol><li>The SYNERGxDB search engine allows users to identify potential biomarkers and novel drug combinations according to the predicted synergy scores, by querying for a subset of cell lines or one cell line, the first compound in combination, the second compound in combination, and/or dataset of choice to explore. http://SYNERGxDB.ca/</li></ol>';
// const searchPath = '../../images/docs/search.JPG';
// const synText = '<ol><li><b>Synergy Scores</b><ol><li>Synergy scores are calculated for each drug combination experiment in SYNERGxDB (N = 477,595), which includes: tissue, cell line, the first/second compounds, ZIP, Bliss, Loewe, and HSA. Users can provide ‘Bortezomib’ and ‘Topotecan’ to pull out all synergy scores tested in any cell lines/datasets. http://SYNERGxDB.ca/synergy_score?drugId1=11&drugId2=97</li></ol>';
// const synPath = '../../images/docs/syn.JPG';
// const samplesText = '<ol><li><b>Samples</b><ol><li>All of the cell lines in SYNERGxDB are visually represented in a pie-chart based upon the following categories: tissues, sex, age, biopsy. By hovering over each slice of a chart, users can gain additional information about the cell lines (e.g. number of cell lines derived from skin tissue). Metadata is provided for each cell line in SYNERGxDB (N = 124), which includes: cell line name, tissue origin, sex, age, associated disease, and Cellosaurus accession ID. http://SYNERGxDB.ca/cell-lines/</li></ol>';
// const samplesPath = '../../images/docs/samples.JPG';
// const compoundsText = '<ol><li><b>Compounds</b><ol><li>Metadata is provided for each drug compound in SYNERGxDB (N = 1,962), which includes: compound name, ATC code, PubChem CID, and DrugBank ID. By hovering over each bar of a chart, users can gain additional information about the number of compounds tested in a given dataset. http://SYNERGxDB.ca/drugs</li></ol>';
// const compoundsPath = '../../images/docs/compounds.JPG';
// const datasetsText = '<ol><li><b>Datasets</b><ol><li>Each study (dataset) is summarized through the following characteristics: dataset name, source of study, number of cell lines, number of drug compounds, and concentration design - e.g. 3-by-3 concentrations. http://SYNERGxDB.ca/datasets/</li></ol>';
// const datasetsPath = '../../images/docs/datasets.JPG';
// const pharmacoText = '<ol><li><b>Pharmacogenomic Analysis</b><ol><li>Users can select a type of molecular/metabolomic profile (e.g., gene expression) and a gene symbol along with a set of cell lines in one specific tissue or a set of user-preferred cell lines across multiple tissues. Subsequently, one or two compounds (maximum) are selected, which results in just one or all possible drug combinations to be analyzed with the respective cell lines. Lastly, synergy scores are selected to be analyzed that will carry out an association test between genomic characteristics and synergy scores. Here, we showed an example in an association between FANK1 expression and synergy scores in ‘Bortezomib + Topotecan’. http://SYNERGxDB.ca/pharmacogenomics?example=true</li></ol>';
// const pharmacoPath = '../../images/docs/pharmaco.JPG';
// const biomarkerText = '<ol><li><b>Biomarker discovery</b><ol><li>We tested an association between gene expression and synergy score in each dataset and provide concordance indices in order to identify potential predictive biomarkers in combination therapies. Users can select a threshold to define two groups – synergy score high and low – to carry out statistical testing between the two groups in terms of gene expression. http://</li></ol>';
// const biomarkerPath = '../../images/docs/biomarker.JPG';
// const sensitivityText = '<ol><li><b>Cell-line Sensitivity Analysis</b><ol><li>This analysis provides the summarized synergistic/antagonistic patterns of drug combinations in a single heatmap across multiple datasets within a given tissue type or a set of cell lines selected by users. In addition, the distribution of synergy scores in unselected samples will be displayed in box plots that are aligned with each drug combination. The cell line(s) of a respective drug combination that has the most hit(s) (i.e. synergy score > 0.2) will be displayed on the top row of the heatmap, with the combinations that possess the least hits residing at the bottom. Users also have the ability to identify which drug in a given database shows the most synergistic effects when one drug is administered. http://</li></ol>';
// const sensitivityPath = '../../images/docs/sensitivity.JPG';
// const enrichmentText = '<ol><li><b>Tissue-specific Enrichment Analysis</b><ol><li>This analysis module displays the synergistic effect of the drug combination of specific tissue types with receiver operating characteristic (ROC) curves. By ranking the cell lines, the area under the curve (AUC) will be calculated for each tissue type to see whether a set of cell lines are highly ranked compared to others within the database. On the left side of the tab view, tissue-specific AUCs will be displayed in a single table and users can sort the table by AUC. On the right side, synergy scores will be displayed in a waterfall plot along with ROC curve(s) for the selected tissue type. http://</li></ol>';
// const enrichmentPath = '../../images/docs/enrichment.JPG';
// const consistencyText = '<ol><li><b>Consistency in Synergy Scores</b><ol><li>Users can compare two methods of the synergy scores on a scatter plot and statistical testing will be carried out including concordance index, Spearman rho, and Pearson r.</li></ol>';
// const consistencyPath = '../../images/docs/consistency.JPG';
// const detailedText = '<ol><li><b>Detailed Synergy Scores</b><ol><li>Synergy matrices are provided for each score that is calculated for an experiment, where concentrations of compound A and B and corresponding inhibition values (%) are presented. Users are able to further investigate the relationship between each drug combination and synergy score through 3D-surface plots, where synergism is depicted through colour intensity. http://</li></ol>';
// const detailedPath = '../../images/docs/detailed.JPG';
// const useText = '<ol><li><b>A Use-Case Scenario</b><ol><li></li></ol>';
// const usePath = '';

const overviewText = '';
const overviewPath = '';
const searchText = '<ol><li><b>Search</b><ol><li>The SYNERGxDB search engine allows users to identify potential biomarkers and novel drug combinations according to the predicted synergy scores, by querying for a subset of cell lines or one cell line, the first compound in combination, the second compound in combination, and/or dataset of choice to explore. http://SYNERGxDB.ca/</li></ol>';
const synText = '<ol><li><b>Synergy Scores</b><ol><li>Synergy scores are calculated for each drug combination experiment in SYNERGxDB (N = 477,595), which includes: tissue, cell line, the first/second compounds, ZIP, Bliss, Loewe, and HSA. Users can provide ‘Bortezomib’ and ‘Topotecan’ to pull out all synergy scores tested in any cell lines/datasets. http://SYNERGxDB.ca/synergy_score?drugId1=11&drugId2=97</li></ol>';
const samplesText = '<ol><li><b>Samples</b><ol><li>All of the cell lines in SYNERGxDB are visually represented in a pie-chart based upon the following categories: tissues, sex, age, biopsy. By hovering over each slice of a chart, users can gain additional information about the cell lines (e.g. number of cell lines derived from skin tissue). Metadata is provided for each cell line in SYNERGxDB (N = 124), which includes: cell line name, tissue origin, sex, age, associated disease, and Cellosaurus accession ID. http://SYNERGxDB.ca/cell-lines/</li></ol>';
const compoundsText = '<ol><li><b>Compounds</b><ol><li>Metadata is provided for each drug compound in SYNERGxDB (N = 1,962), which includes: compound name, ATC code, PubChem CID, and DrugBank ID. By hovering over each bar of a chart, users can gain additional information about the number of compounds tested in a given dataset. http://SYNERGxDB.ca/drugs</li></ol>';
const datasetsText = '<ol><li><b>Datasets</b><ol><li>Each study (dataset) is summarized through the following characteristics: dataset name, source of study, number of cell lines, number of drug compounds, and concentration design - e.g. 3-by-3 concentrations. http://SYNERGxDB.ca/datasets/</li></ol>';
const pharmacoText = '<ol><li><b>Pharmacogenomic Analysis</b><ol><li>Users can select a type of molecular/metabolomic profile (e.g., gene expression) and a gene symbol along with a set of cell lines in one specific tissue or a set of user-preferred cell lines across multiple tissues. Subsequently, one or two compounds (maximum) are selected, which results in just one or all possible drug combinations to be analyzed with the respective cell lines. Lastly, synergy scores are selected to be analyzed that will carry out an association test between genomic characteristics and synergy scores. Here, we showed an example in an association between FANK1 expression and synergy scores in ‘Bortezomib + Topotecan’. http://SYNERGxDB.ca/pharmacogenomics?example=true</li></ol>';
const biomarkerText = '<ol><li><b>Biomarker discovery</b><ol><li>We tested an association between gene expression and synergy score in each dataset and provide concordance indices in order to identify potential predictive biomarkers in combination therapies. Users can select a threshold to define two groups – synergy score high and low – to carry out statistical testing between the two groups in terms of gene expression. http://SYNERGxDB.ca/biomarker?&drugId1=11&drugId2=97</li></ol>';
const sensitivityText = '<ol><li><b>Cell-line Sensitivity Analysis</b><ol><li>This analysis provides the summarized synergistic/antagonistic patterns of drug combinations in a single heatmap across multiple datasets within a given tissue type or a set of cell lines selected by users. In addition, the distribution of synergy scores in unselected samples will be displayed in box plots that are aligned with each drug combination. The cell line(s) of a respective drug combination that has the most hit(s) (i.e. synergy score > 0.2) will be displayed on the top row of the heatmap, with the combinations that possess the least hits residing at the bottom. Users also have the ability to identify which drug in a given database shows the most synergistic effects when one drug is administered. http://SYNERGxDB.ca/sensitivity?&drugId1=11&drugId2=97</li></ol>';
const enrichmentText = '<ol><li><b>Tissue-specific Enrichment Analysis</b><ol><li>This analysis module displays the synergistic effect of the drug combination of specific tissue types with receiver operating characteristic (ROC) curves. By ranking the cell lines, the area under the curve (AUC) will be calculated for each tissue type to see whether a set of cell lines are highly ranked compared to others within the database. On the left side of the tab view, tissue-specific AUCs will be displayed in a single table and users can sort the table by AUC. On the right side, synergy scores will be displayed in a waterfall plot along with ROC curve(s) for the selected tissue type. http://SYNERGxDB.ca/enrichment?&drugId1=11&drugId2=97</li></ol>';
const consistencyText = '<ol><li><b>Consistency in Synergy Scores</b><ol><li>Users can compare two methods of the synergy scores on a scatter plot and statistical testing will be carried out including concordance index, Spearman rho, and Pearson r. http://SYNERGxDB.ca/consistency?&drugId1=11&drugId2=97</li></ol>';
const detailedText = '<ol><li><b>Detailed Synergy Scores</b><ol><li>Synergy matrices are provided for each score that is calculated for an experiment, where concentrations of compound A and B and corresponding inhibition values (%) are presented. Users are able to further investigate the relationship between each drug combination and synergy score through 3D-surface plots, where synergism is depicted through colour intensity. http://SYNERGxDB.ca/drug_combo?idSource=2&idDrugA=11&idDrugB=97&idSample=15&comboId=43943</li></ol>';
const useText = '<ol><li><b>A Use-Case Scenario</b><ol><li></li></ol>';
const usePath = '';

class MainDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: 'overview',
      funcText: overviewText,
      imgPath: '',
      type: 'general',
    };
    this.handleDocChange = this.handleDocChange.bind(this);
  }

  handleDocChange(display) {
    switch (display) {
      case 'overview':
        this.setState({
          display, type: 'general',
        });
        break;
      case 'search':
        this.setState({
          display, type: 'general',
        });
        break;
      case 'syn':
        this.setState({
          funcText: synText, imgPath: synPath, display, type: 'general',
        });
        break;
      case 'samples':
        this.setState({
          funcText: samplesText, imgPath: samplesPath, display, type: 'general',
        });
        break;
      case 'compounds':
        this.setState({
          funcText: compoundsText, imgPath: compoundsPath, display, type: 'general',
        });
        break;
      case 'datasets':
        this.setState({
          funcText: datasetsText, imgPath: datasetsPath, display, type: 'general',
        });
        break;
      case 'pharmaco':
        this.setState({
          funcText: pharmacoText, imgPath: pharmacoPath, display, type: 'general',
        });
        break;
      case 'biomarker':
        this.setState({
          funcText: biomarkerText, imgPath: biomarkerPath, display, type: 'general',
        });
        break;
      case 'sensitivity':
        this.setState({
          funcText: sensitivityText, imgPath: sensitivityPath, display, type: 'general',
        });
        break;
      case 'enrichment':
        this.setState({
          funcText: enrichmentText, imgPath: enrichmentPath, display, type: 'general',
        });
        break;
      case 'consistency':
        this.setState({
          funcText: consistencyText, imgPath: consistencyPath, display, type: 'general',
        });
        break;
      case 'detailed':
        this.setState({
          funcText: detailedText, imgPath: detailedPath, display, type: 'general',
        });
        break;
      case 'use':
        this.setState({
          funcText: useText, imgPath: usePath, display, type: 'general',
        });
        break;
      default:
        this.setState({ display, type: 'api' });
        break;
    }
  }

  render() {
    const { handleDocChange } = this;
    const {
      display, funcText, imgPath, type,
    } = this.state;
    return (

      <StyledDiv>
        <main className="documentation">
          <nav>
            <ul>
              <li
                className={display === 'overview' ? 'selected' : null}
              >
                <button type="button" onClick={() => handleDocChange('overview')}>Functionality</button>
              </li>
              {/* Functionality sub-features */}
              {/* Basic features */}
              <li className="sub-head">Basic Features</li>
              <li
                className={display === 'search' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('search')}>Search</button>
              </li>
              <li
                className={display === 'syn' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('syn')}>Synergy Scores</button>
              </li>
              <li
                className={display === 'samples' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('samples')}>Samples</button>
              </li>
              <li
                className={display === 'compounds' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('compounds')}>Compounds</button>
              </li>
              <li
                className={display === 'datasets' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('datasets')}>Datasets</button>
              </li>
              {/* Advanced features */}
              <li className="sub-head">Advanced Features</li>
              <li
                className={display === 'pharmaco' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('pharmaco')}>Pharmacogenomics Analysis</button>
              </li>
              <li
                className={display === 'biomarker' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('biomarker')}>Biomarker discovery</button>
              </li>
              <li
                className={display === 'sensitivity' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('sensitivity')}>Cell line sensitivity analysis</button>
              </li>
              <li
                className={display === 'enrichment' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('enrichment')}>Tissue-specific enrichment analysis</button>
              </li>
              <li
                className={display === 'consistency' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('consistency')}>Consistency in synergy scores</button>
              </li>
              <li
                className={display === 'detailed' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('detailed')}>Detailed synergy scores</button>
              </li>
              {/* Use case */}
              <li
                className={display === 'use' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('use')}>Use case</button>
              </li>
              {/* Functionality sub-features end */}
              {/* API */}
              <li
                className={display === 'api' ? 'selected' : null}
              >
                <button type="button" onClick={() => handleDocChange('api')}>API</button>
              </li>
              <li
                className={display === 'api-cells' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('api-cells')}>Samples</button>
              </li>
              <li
                className={display === 'api-drugs' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('api-drugs')}>Compounds</button>
              </li>
              <li
                className={display === 'api-datasets' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('api-datasets')}>Datasets</button>
              </li>
              <li
                className={display === 'api-combos' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('api-combos')}>Drug Combinations</button>
              </li>
              <li
                className={display === 'api-biomarkers' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('api-biomarkers')}>Biomarkers</button>
              </li>
              <li
                className={display === 'api-pharma' ? 'selected sub-func' : 'sub-func'}
              >
                <button type="button" onClick={() => handleDocChange('api-pharma')}>Pharmacogenomics</button>
              </li>
            </ul>
          </nav>
          <div className="doc">
            {type === 'general' ? (
              <FunctionalDoc display={display} />
            ) : (
              <APIDoc display={display} />
            )}
            {/* {display === 'func' ? <GeneralDoc /> : <APIDoc />} */}
          </div>
        </main>
        <footer>
          <p>Copyright © 2019. All rights reserved</p>
        </footer>
      </StyledDiv>
    );
  }
}

export default MainDocument;
