// usage: node historicalDataRequest.js <host>
var express = require('express'); // call express
var fs = require('fs');
var app = express();

//var bodyParser = require('body-parser');
var https = require('https');

var host = process.argv[2] || '127.0.0.1';

app.get('/stocks', function(req1, res1) {
    var symbols = ['DDD', 'MMM', 'WBAI', 'WUBA', 'AHC', 'ATEN', 'AAC', 'AIR', 'AAN', 'ABB', 'ABT', 'ABBV', 'ANF', 'GCH', 'JEQ', 'SGF', 'ABM', 'AKR', 'ACN', 'ACMP', 'ACCO', 'ACW', 'ACE', 'ATV', 'ACT', 'ATU', 'AYI', 'ADX', 'AGRO', 'ADPT', 'ADT', 'AAP', 'WMS', 'ASX', 'AAV', 'ATE', 'AVK', 'AGC', 'LCM', 'ACM', 'ANW', 'AEB', 'AED', 'AEG', 'AEH', 'AEK', 'AER', 'HIVE', 'ARO', 'AET', 'AFM', 'AMG', 'MGR', 'AFL', 'AFSD', 'MITT', 'MITT ^ A', 'MITT ^ B', 'AGCO', 'A', 'GAS', 'AEM', 'ADC', 'GRO', 'AGU', 'AL', 'APD', 'AYR', 'ARG', 'AKS', 'ALP ^ N', 'ALP ^ O', 'ALP ^ P', 'ALG', 'AGI', 'ALK', 'AIN', 'ALB', 'ALU', 'AA', 'AA ^ B', 'ALR', 'ALR ^ B', 'ALEX', 'ALX', 'ARE', 'ARE ^ E', 'BABA', 'Y', 'ATI', 'ALLE', 'AGN', 'ALE', 'AKP', 'ADS', 'AFB', 'AYN', 'AOI', 'AWF', 'ACG', 'AB', 'LNT', 'ATK', 'NCV', 'NCZ', 'NIE', 'NFJ', 'AWH', 'ALSN', 'ALL', 'ALL ^ A', 'ALL ^ B', 'ALL ^ C', 'ALL ^ D', 'ALL ^ E', 'ALL ^ F', 'ALLY', 'ALLY ^ A', 'ALLY ^ B', 'BSI', 'ALJ', 'ALDW', 'ANR', 'AGD', 'AWP', 'AOD', 'RESI', 'MO', 'ACH', 'AMBR', 'ABEV', 'AMC', 'AMFW', 'AEE', 'AMRC', 'AMX', 'AAT', 'AXL', 'ACC', 'AEO', 'AEP', 'AEL', 'AXP', 'AFA', 'AFG', 'AFGE', 'AFQ', 'AFW', 'AMH', 'AMH ^ A', 'AMH ^ B', 'AMH ^ C', 'AIG', 'AIG / WS', 'AMID', 'ARL', 'ARPI', 'AWR', 'AMT', 'AMT ^ A', 'AVD', 'AWK', 'APU', 'AMP', 'ABC', 'ANFI', 'AHS', 'AP', 'APH', 'AMRE', 'AXR', 'AME', 'AFSI ^ A', 'AFSI ^ B', 'AFSI ^ C', 'APC', 'AU', 'BUD', 'AXE', 'ANN', 'NLY', 'NLY ^ A', 'NLY ^ C', 'NLY ^ D', 'AM', 'AR', 'ANTM', 'ANH', 'ANH ^ A', 'ANH ^ B', 'AOL', 'AON', 'APA', 'AIV', 'AIV ^ A', 'AIV ^ Z', 'ARI', 'ARI ^ A', 'APO', 'AIB', 'AIY', 'AMTG', 'AMTG ^ A', 'AFT', 'AIF', 'AIT', 'ATR', 'WTR', 'ARMK', 'ABR', 'ABR ^ A', 'ABR ^ B', 'ABR ^ C', 'ABRN', 'ARC', 'ARCX', 'MT', 'MTCN', 'ARH ^ C', 'ACI', 'ADM', 'ARCO', 'ASC', 'AFC', 'ARN', 'ARU', 'ARY', 'ACRE', 'ARDC', 'ARES', 'ARMF', 'AGX', 'ANET', 'AI', 'AIW', 'AHH', 'ARR', 'ARR ^ A', 'ARR ^ B', 'AWI', 'ARW', 'AJG', 'APAM', 'ASA', 'ABG', 'AHP', 'AHT', 'AHT ^ A', 'AHT ^ D', 'AHT ^ E', 'ASH', 'APB', 'GRR', 'ASPN', 'AHL', 'AHL ^ A', 'AHL ^ B', 'AHL ^ C', 'ASB', 'ASB ^ B', 'AEC', 'AIZ', 'AGO', 'AGO ^ B', 'AGO ^ E', 'AGO ^ F', 'AF', 'AF ^ C', 'AZN', 'T', 'ATTO', 'AT', 'ATLS', 'APL', 'APL ^ E', 'ARP', 'ARP ^ D', 'ATO', 'ATW', 'AUO', 'AUQ', 'ATHM', 'ALV', 'AN', 'AZO', 'AVB', 'ACP', 'AVY', 'AVG', 'AVH', 'AVA', 'AVIV', 'AV', 'AVV', 'AVT', 'AVOL', 'AVP', 'AVX', 'AXTA', 'AXLL', 'AXS', 'AXS ^ C', 'AXS ^ D', 'AZZ', 'BGS', 'BWC', 'MCI', 'BGH', 'MPV', 'BMI', 'BHI', 'BBN', 'BLL', 'BALT', 'BGE ^ B', 'BANC', 'BANC ^ C', 'BOCA', 'BBVA', 'BBD', 'BBDO', 'BCH', 'BLX', 'BSBR', 'BSAC', 'SAN', 'SAN ^ A', 'SAN ^ B', 'SAN ^ C', 'SAN ^ I', 'CIB', 'BXS', 'BAC', 'BAC / WS / A', 'BAC / WS / B', 'BAC ^ D', 'BAC ^ E', 'BAC ^ I', 'BAC ^ L', 'BAC ^ W', 'BAC ^ Z', 'BML ^ G', 'BML ^ H', 'BML ^ I', 'BML ^ J', 'BML ^ L', 'BOH', 'BMO', 'BK', 'BK ^ C', 'BNS', 'RATE', 'BKU', 'BCS', 'BCS ^ ', 'BCS ^ A', 'BCS ^ C', 'BCS ^ D', 'BKS', 'B', 'CUDA', 'ABX', 'BAS', 'BAX', 'BTE', 'BBT', 'BBT ^ D', 'BBT ^ E', 'BBT ^ F', 'BBT ^ G', 'BFR', 'BBX', 'BCE', 'TZF', 'BZH', 'BZT', 'BDX', 'BDC', 'BXE', 'BEL', 'BMS', 'BHE', 'BRK / A', 'BRK / B', 'BHLB', 'BBY', 'BGCA', 'BHP', 'BBL', 'BIG', 'BH', 'BBG', 'BIOA', 'BIOA / WS', 'BMR', 'BIO', 'BIO / B', 'BITA', 'BKH', 'BJZ', 'BFZ', 'CII', 'BHK', 'HYT', 'BTZ', 'DSU', 'BHL', 'BGR', 'BDJ', 'EGF', 'FRA', 'BFO', 'BGT', 'BOE', 'BME', 'BAF', 'BKT', 'BGY', 'BKN', 'BTA', 'BIT', 'MUI', 'MNE', 'MUA', 'BPK', 'BKK', 'BIE', 'BBK', 'BBF', 'BYM', 'BFK', 'BTT', 'MEN', 'MUC', 'MUH', 'MHD', 'MFL', 'MUJ', 'MHN', 'MUE', 'MUS', 'MVT', 'MYC', 'MCA', 'MYD', 'MYF', 'MFT', 'MYM', 'MIY', 'MYJ', 'MJI', 'MYN', 'MPA', 'MQT', 'MYI', 'MQY', 'BNJ', 'BNY', 'BLH', 'BQH', 'BSE', 'BCX', 'BST', 'BSD', 'BUI', 'BLK', 'BGB', 'BGX', 'BSL', 'BLT', 'BCRH', 'BXC', 'BTH', 'BWP', 'BA', 'BCC', 'BCEI', 'BOOT', 'BAH', 'BWA', 'SAM', 'BXP', 'BXP ^ B', 'BSX', 'BTF', 'TEU', 'TEU ^ C', 'BYD', 'BP', 'BPT', 'BERY', 'BPZ', 'BRC', 'BDN ^ E', 'BDN', 'LND', 'BAK', 'BRFS', 'BPI', 'BGG', 'BFAM', 'EAT', 'BCO', 'BMY', 'BRS', 'BRX', 'BR', 'BKD', 'BAM', 'BOXC', 'DTLA ^ ', 'INF', 'HHY', 'BIP', 'BOI', 'BPY', 'BEP', 'BRP', 'HTR', 'BRO', 'BF / A', 'BF / B', 'BWS', 'BRT', 'BC', 'BT', 'BPL', 'BKE', 'BVN', 'BBW', 'BG', 'BURL', 'CJES', 'BCR', 'BNK', 'GYB', 'PFH', 'CAB', 'CVC', 'CBT', 'COG', 'CACI', 'CAE', 'CAP', 'CCC', 'CRC', 'CWT', 'CALX', 'ELY', 'CPE', 'CPE ^ A', 'CPN', 'CBM', 'CPT', 'CCJ', 'CAM', 'CPB', 'CCG', 'CCG ^ A', 'CM', 'CNI', 'CNQ', 'CP', 'CAJ', 'CMN', 'COF ^ P', 'COF', 'COF / WS', 'COF ^ C', 'COF ^ D', 'CSU', 'BXMT', 'CLA', 'CMO', 'CMO ^ E', 'CRR', 'CAH', 'CRCM', 'CFN', 'CSL', 'KMX', 'CCL', 'CUK', 'CRS', 'CSV', 'CRI', 'CSH', 'CAS', 'CSLT', 'CTLT', 'CTT', 'CAT', 'CATO', 'CBZ', 'CBL', 'CBL ^ D', 'CBL ^ E', 'CBO', 'IGR', 'CBG', 'CBS', 'CBS / A', 'CBX', 'CDI', 'FUN', 'CDR', 'CDR ^ B', 'CGI', 'CE', 'CLS', 'CEL', 'CPAC', 'CX', 'CNCO', 'CVE', 'CNC', 'CEN', 'CNP', 'EBR', 'EBR / B', 'CEE', 'LEU', 'CCS', 'CTL', 'CVO', 'CF', 'CGG', 'GIB', 'CSG', 'ECOM', 'CRL', 'CLDT', 'HELI', 'CKP', 'CMCM', 'CHGG', 'CHE', 'CHMT', 'CHMI', 'CHK', 'CHK ^ D', 'CHKR', 'CHSP', 'CHSP ^ A', 'CPK', 'CVX', 'CBI', 'CHS', 'CIM', 'CO', 'STV', 'DL', 'CEA', 'CHN', 'CGA', 'LFC', 'MY', 'CHL', 'NPD', 'BORN', 'SNP', 'ZNH', 'CHA', 'CHU', 'XNY', 'CYD', 'ZX', 'CMG', 'CHH', 'CBK', 'CB', 'CHT', 'CHD', 'CBR', 'CIEN', 'CI', 'XEC', 'CBB', 'CBB ^ B', 'CNK', 'CIR', 'CIT', 'BLW', 'C', 'C / WS / A', 'C / WS / B', 'C ^ C', 'C ^ J', 'C ^ K', 'C ^ L', 'C ^ N', 'C ^ P', 'CFG', 'CIA', 'CYN', 'CYN ^ C', 'CYN ^ D', 'CIO', 'CVEO', 'CIVI', 'CLC', 'CWEI', 'CLH', 'CCO', 'CBA', 'CEM', 'EMO', 'CTR', 'CLW', 'CNL', 'CLF', 'CLV', 'CLX', 'CLD', 'MYCC', 'CMS', 'CMS ^ B', 'CNA', 'CNHI', 'CNO', 'CEO', 'COH', 'CIE', 'KOF', 'KO', 'CCE', 'CDE', 'CDE / WS', 'FOF', 'INB', 'UTF', 'LDP', 'MIE', 'RQI', 'RNP', 'PSF', 'RFI', 'CNS', 'CFX', 'CL', 'CXE', 'CMK', 'CIF', 'CXH', 'CMU', 'CLNY', 'CLNY ^ A', 'CLNY ^ B', 'CXP', 'STK', 'CCV', 'CCZ', 'CMA', 'CMA / WS', 'FIX', 'CMC', 'CBU', 'CYH', 'CIG', 'CIG / C', 'CBD', 'SBS', 'ELP', 'CCU', 'CODI', 'CMP', 'CSC', 'CRK', 'CAG', 'CXO', 'CCM', 'CNNX', 'COP', 'CNX', 'ED', 'STZ', 'STZ / B', 'CSTM', 'TCS', 'CBPX', 'CLR', 'VLRS', 'CVG', 'CNW', 'COO', 'CTB', 'CPS', 'CPA', 'CLB', 'CLGX', 'CORR', 'COR', 'COR ^ A', 'GLW', 'BCA', 'GYC', 'OFC', 'OFC ^ L', 'CXW', 'CZZ', 'CMRE', 'CMRE ^ B', 'CMRE ^ C', 'COT', 'COTY', 'CCSC', 'CFC ^ A', 'CFC ^ B', 'COUP', 'CUZ', 'CVD', 'CVA', 'COV', 'CPF', 'CPL', 'CR', 'CRD / A', 'CRD / B', 'BAP', 'CS', 'CPG', 'CEQP', 'CRH', 'CRT', 'CAPL', 'CCI', 'CCI ^ A', 'CCK', 'CRY', 'CSS', 'CST', 'CSX', 'CTS', 'CUBE', 'CUBE ^ A', 'CUB', 'CFR', 'CFR ^ A', 'CFI', 'CMI', 'CW', 'SZC', 'CUBI', 'CUBS', 'CSI', 'CVT', 'CVI', 'UAN', 'CVRR', 'CVS', 'CYNI', 'CELP', 'CYS', 'CYS ^ A', 'CYS ^ B', 'CYT', 'DHI', 'DAN', 'DHR', 'DAC', 'DQ', 'DRI', 'DAR', 'DVA', 'DPM', 'DCT', 'DDR', 'DDR ^ J', 'DDR ^ K', 'DF', 'DECK', 'DE', 'DEX', 'DDF', 'DKL', 'DK', 'DLPH', 'DAL', 'DEL', 'DLX', 'DMD', 'DWRE', 'DNR', 'DKT', 'DB', 'DTK', 'DTT', 'DUA', 'DXB', 'DVN', 'DV', 'DHT', 'DEO', 'DO', 'DRII', 'DRH', 'DSX', 'DSX ^ B', 'DHX', 'DKS', 'DBD', 'DLR', 'DLR ^ E', 'DLR ^ F', 'DLR ^ G', 'DLR ^ H', 'DGI', 'DDS', 'DDT', 'DIN', 'DPLO', 'DFS', 'DFS ^ B', 'DRA', 'DNI', 'DLB', 'DG', 'DDC', 'DM', 'DOM', 'D', 'DCUA', 'DCUB', 'DCUC', 'DPZ', 'UFS', 'DCI', 'DRL', 'LPG', 'DSL', 'DBL', 'PLOW', 'DEI', 'DOV', 'DDE', 'DVD', 'DOW', 'DPS', 'RDY', 'DRD', 'DRC', 'DW', 'DHF', 'DMB', 'DSM', 'LEO', 'DRQ', 'DST', 'DSW', 'DTE', 'DTQ', 'DTZ', 'DCO', 'DPG', 'DSE', 'DNP', 'DTF', 'DUC', 'DUK', 'DUKH', 'DRE', 'DNB', 'DFT', 'DFT ^ A', 'DFT ^ B', 'DHG', 'DY', 'DLNG', 'DYN', 'DYN / WS', 'DYN ^ A', 'DX', 'DX ^ A', 'DX ^ B', 'DD', 'DD ^ A', 'DD ^ B', 'SSP', 'EXP', 'ECC', 'EGP', 'EMN', 'KODK', 'KODK / WS', 'KODK / WS / A', 'ETN', 'ETV', 'ETW', 'EV', 'EOI', 'EOS', 'EFT', 'EFF', 'ETX', 'EOT', 'EVN', 'ETJ', 'EFR', 'EVF', 'EVG', 'EVT', 'ETO', 'EXD', 'ETG', 'ETB', 'ETY', 'EXG', 'ECT', 'ECR', 'ECL', 'DANG', 'EC', 'EIX', 'EDR', 'EW', 'EHIC', 'EJ', 'EP ^ C', 'EE', 'EGO', 'LLY', 'ELLI', 'EFC', 'EARN', 'AKO / A', 'AKO / B', 'ERJ', 'EMC', 'EME', 'EMES', 'EBS', 'EMR', 'EDE', 'ESRT', 'EIG', 'EDN', 'EOC', 'ICA', 'ELX', 'ENBL', 'EEQ', 'EEP', 'ENB', 'ECA', 'EXK', 'ENH', 'ENH ^ A', 'ENH ^ B', 'NDRO', 'EGN', 'ENR', 'ETE', 'ETP', 'ERF', 'ENI', 'ENS', 'EGL', 'E', 'ENLK', 'ENLC', 'EBF', 'ENVA', 'NPO', 'ESV', 'ETM', 'EAA', 'EAB', 'EAE', 'ETR', 'ELA', 'ELB', 'ELJ', 'ELU', 'EFM', 'EMQ', 'EMZ', 'ENJ', 'EZT', 'EPD', 'EVC', 'ENV', 'EVHC', 'ENZ', 'EOG', 'EPE', 'EPAM', 'EPR', 'EPR ^ C', 'EPR ^ E', 'EPR ^ F', 'EQT', 'EQM', 'EFX', 'EQC', 'EQC ^ D', 'EQC ^ E', 'EQCO', 'ELS', 'ELS ^ C', 'EQY', 'EQR', 'EQS', 'ERA', 'EROS', 'ESE', 'ESNT', 'ESS', 'ESS ^ H', 'EL', 'ESL', 'DEG', 'ETH', 'EEA', 'EVER', 'EVER ^ A', 'EVR', 'RE', 'EVTC', 'EVDY', 'EVGN', 'EXAM', 'EXAR', 'EXL', 'EXL ^ B', 'XCO', 'XLS', 'EXC', 'EXCU', 'EXPR', 'STAY', 'EXH', 'EXR', 'XOM', 'FNB', 'FNB ^ E', 'FN', 'FDS', 'FICO', 'FDO', 'FFG', 'FCB', 'AGM', 'AGM / A', 'AGM ^ A', 'AGM ^ B', 'AGM ^ C', 'FRT', 'FSS', 'FTT', 'FII', 'FPT', 'FMN', 'FDX', 'FCH', 'FCH ^ A', 'FCH ^ C', 'FGP', 'FOE', 'FCAM', 'FCAU', 'FBR', 'FGL', 'FNF', 'FNFV', 'FIS', 'FMO', 'FSCE', 'FAC', 'FAF', 'FBP', 'FBS ^ A', 'FCF', 'FHN', 'FHN ^ A', 'FR', 'AG', 'FMD', 'FNFG ^ B', 'FPO', 'FPO ^ A', 'FRC', 'FRC ^ A', 'FRC ^ B', 'FRC ^ C', 'FRC ^ D', 'FRC ^ E', 'FFA', 'FMY', 'FAV', 'FIF', 'FSD', 'FPF', 'FEI', 'FPL', 'FCT', 'FGB', 'FHY', 'FEO', 'FAM', 'FE', 'FMER ^ A', 'OAKS', 'OAKS ^ A', 'FVE', 'FBC', 'DFP', 'PFD', 'PFO', 'FFC', 'FLC', 'FLT', 'FLTX', 'FTK', 'FLO', 'FLS', 'FLR', 'FLY', 'FMC', 'FTI', 'FMSA', 'FMX', 'FL', 'F', 'FELP', 'FCE / A', 'FCE / B', 'FOR', 'FDI', 'FIG', 'FSM', 'FBHS', 'FET', 'FNV', 'FC', 'BEN', 'FT', 'FI', 'FCX', 'FSL', 'FMS', 'FDP', 'FRO', 'FSIC', 'FCN', 'FRM', 'FF', 'FXCM', 'GCV', 'GCV ^ B', 'GDV', 'GDV ^ A', 'GDV ^ D', 'GAB', 'GAB ^ D', 'GAB ^ G', 'GAB ^ H', 'GGZ', 'GGT', 'GGT ^ B', 'GUT', 'GUT ^ A', 'GFA', 'GCAP', 'GBL', 'GNT', 'GME', 'GCI', 'GPS', 'IT', 'GLOG', 'GLOP', 'GMT', 'GZT', 'GY', 'GNRC', 'GAM', 'GAM ^ B', 'BGC', 'GD', 'GEH', 'GEK', 'GE', 'GEB', 'GGP', 'GGP ^ A', 'GIS', 'GM', 'GM / WS / A', 'GM / WS / B', 'GM / WS / C', 'GSI', 'GCO', 'GWR', 'GWRU', 'GEL', 'GNE', 'GNE ^ A', 'G', 'GPC', 'GNW', 'GEO', 'GPRK', 'GPE ^ A', 'GGB', 'GTY', 'GFIG', 'GIMO', 'GIL', 'GLT', 'GSK', 'BRSS', 'GCA', 'GHI', 'GLP', 'GPN', 'GLPW', 'GSL', 'GSL ^ B', 'GLOB', 'GMED', 'GNC', 'GOL', 'GFI', 'GG', 'GER', 'GMZ', 'GS', 'GS ^ A', 'GS ^ B', 'GS ^ C', 'GS ^ D', 'GS ^ I', 'GS ^ J', 'GS ^ K', 'GSF', 'GSJ', 'TFG', 'GDP', 'GDP ^ C', 'GDP ^ D', 'GOV', 'IRE', 'GPX', 'GGG', 'GTI', 'GHM', 'GHC', 'GPT', 'GPT ^ B', 'GRAM', 'GVA', 'GRP / U', 'GPK', 'GTN', 'GTN / A', 'GNI', 'GXP', 'GXP ^ A', 'GXP ^ D', 'GXP ^ E', 'GWB', 'GB', 'GDOT', 'GBX', 'GHL', 'GEF', 'GEF / B', 'GFF', 'GPI', 'GRUB', 'GMK', 'PAC', 'ASR', 'AVAL', 'BSMX', 'TV', 'GTT', 'GSH', 'GES', 'GBAB', 'GGM', 'GPM', 'GGE', 'GEQ', 'GOF', 'GWRE', 'GUA', 'GLF', 'HRB', 'FUL', 'HAE', 'HK', 'HAL', 'HYH', 'HBI', 'HGR', 'HASI', 'HRG', 'HOG', 'HAR', 'HMY', 'HRS', 'HSC', 'HHS', 'HGH', 'HIG', 'HIG / WS', 'HNR', 'HTS', 'HTS ^ A', 'HVT', 'HVT / A', 'HE', 'HE ^ U', 'HCA', 'HCC', 'HCI', 'HCJ', 'HCP', 'HDB', 'HW', 'HCN', 'HCN ^ I', 'HCN ^ J', 'HNT', 'HR', 'HTA', 'HLS', 'HPY', 'HL', 'HL ^ B', 'HEI', 'HEI / A', 'HLX', 'HP', 'HLF', 'HTGC', 'HTGX', 'HTGY', 'HTGZ', 'HRTG', 'HT', 'HT ^ B', 'HT ^ C', 'HSY', 'HTZ', 'HES', 'HPQ', 'HXL', 'HF', 'HGG', 'HCLP', 'ONE', 'HIW', 'HIL', 'HI', 'HRC', 'HTH', 'HLT', 'HNI', 'HMLP', 'HEP', 'HFC', 'HD', 'HME', 'HMC', 'HON', 'HMN', 'HTF', 'HRL', 'HOS', 'HSP', 'HPT', 'HPT ^ D', 'HST', 'HSFC ^ B', 'HOV', 'HHC', 'HSBC', 'HSBC ^ A', 'HSEA', 'HSEB', 'HUSI ^ D', 'HUSI ^ F', 'HUSI ^ G', 'HUSI ^ H', 'HUSI ^ Z', 'HNP', 'HUB / A', 'HUB / B', 'HUBS', 'HBM', 'HBM / WS', 'HPP', 'HPP ^ B', 'HVB', 'HGT', 'HUM', 'HII', 'HUN', 'H', 'HDY', 'HY', 'IAG', 'IBN', 'IDA', 'IEX', 'IDT', 'IHS', 'ITW', 'IMN', 'IMAX', 'IFT', 'IMPV', 'IMPR', 'IMS', 'ICD', 'IHC', 'IFN', 'IBA', 'CMLP', 'BLOX', 'INFY', 'IDG', 'IND', 'ING', 'INZ', 'ISF', 'ISG', 'ISP', 'IR', 'IM', 'INGR', 'IRC', 'IRC ^ A', 'IRC ^ B', 'IPHI', 'NSP', 'IBP', 'IEH', 'TEG', 'I', 'I ^ A', 'ICE', 'IHG', 'IFF', 'IBM', 'IGT', 'IP', 'ISH', 'ISH ^ A', 'ISH ^ B', 'IOC', 'IPG', 'IPL ^ D', 'INXN', 'IL', 'SNOW', 'IPI', 'XON', 'IVC', 'INVN', 'VBF', 'VCV', 'VTA', 'VLT', 'IVR', 'IVR ^ B', 'IVR ^ A', 'OIA', 'VMO', 'VKQ', 'VPV', 'IVZ', 'IQI', 'VVR', 'VTN', 'VGM', 'IIM', 'ITG', 'IRET', 'IRET ^ ', 'IRET ^ B', 'IO', 'IRM', 'IRS', 'ICL', 'STAR', 'STAR ^ D', 'STAR ^ E', 'STAR ^ F', 'STAR ^ G', 'STAR ^ I', 'ITUB', 'ITC', 'ITT', 'ESI', 'IVH', 'JPM', 'JPM / WS', 'JPM ^ A', 'JPM ^ B', 'JPM ^ C', 'JPM ^ D', 'JPM ^ E', 'JCP', 'JGW', 'SJM', 'JBL', 'JEC', 'JHX', 'JNS', 'JOF', 'JAH', 'JMI', 'JKS', 'JMP', 'JMPB', 'JMPC', 'JBT', 'BTO', 'HEQ', 'JHS', 'JHI', 'HPF', 'HPI', 'HPS', 'PDT', 'HTD', 'HTY', 'JW / A', 'JW / B', 'JNJ', 'JCI', 'JONE', 'JLL', 'JRN', 'JOY', 'JPEP', 'JFC', 'JMEI', 'JNPR', 'JE', 'LRN', 'KAI', 'KAMN', 'KSU', 'KSU ^ ', 'KS', 'KAR', 'KATE', 'KED', 'KYE', 'KMF', 'KYN', 'KYN ^ E', 'KYN ^ F', 'KYN ^ G', 'KB', 'KBH', 'KBR', 'KAP', 'KCG', 'K', 'KEM', 'KMPA', 'KMPR', 'KMT', 'KW', 'KWN', 'KEN', 'KEG', 'KEY', 'KEY ^ G', 'KEYS', 'KRC', 'KRC ^ G', 'KRC ^ H', 'KMB', 'KIM', 'KIM ^ H', 'KIM ^ I', 'KIM ^ J', 'KIM ^ K', 'KMI', 'KMI / WS', 'KND', 'KING', 'KFS', 'KGC', 'KEX', 'KRG', 'KRG ^ A', 'KKR', 'KFH', 'KFI', 'KFN ^ ', 'KIO', 'KMG', 'KNX', 'KNL', 'KNOP', 'KN', 'KSS', 'KNM', 'PHG', 'KOP', 'KEP', 'KEF', 'KF', 'KFY', 'KOS', 'KRA', 'KKD', 'KR', 'KRO', 'KT', 'KYO', 'LB', 'SCX', 'LLL', 'LQ', 'LH', 'LG', 'LADR', 'LDR', 'LCI', 'LPI', 'LVS', 'LHO', 'LHO ^ H', 'LHO ^ I', 'LFL', 'LDF', 'LGI', 'LAZ', 'LOR', 'LZB', 'LF', 'LEA', 'LEE', 'BWG', 'LM', 'LEG', 'CVB', 'JBK', 'KCC', 'KTH', 'KTN', 'KTP', 'XKE', 'LDOS', 'LEJU', 'LC', 'LEN', 'LEN / B', 'LII', 'LAS', 'LUK', 'LVLT', 'LXP', 'LXP ^ C', 'LXK', 'LPL', 'USA', 'ASG', 'LPT', 'LTM', 'LOCK', 'LITB', 'LNC', 'LNC / WS', 'LNN', 'LNKD', 'LGF', 'LAD', 'LYV', 'LYG', 'LYG ^ A', 'SCD', 'TLI', 'RIT', 'LMT', 'L', 'LO', 'LPX', 'LOW', 'LRE', 'LXU', 'LTC', 'LUB', 'LL', 'LXFR', 'LXFT', 'LUX', 'LDL', 'WLH', 'LYB', 'MTB', 'MTB / WS', 'MTB ^ ', 'MTB ^ C', 'MDC', 'MHO', 'MHO ^ A', 'MAC', 'CLI', 'MGU', 'MIC', 'MFD', 'BMA', 'M', 'MCN', 'MSP', 'MMP', 'MGA', 'MX', 'MHR', 'MH ^ A', 'MHNA', 'MHNB', 'MHNC', 'MAIN', 'MSCA', 'MMD', 'MNK', 'MZF', 'HYF', 'MANU', 'MTW', 'MN', 'MAN', 'MFC', 'MRO', 'MPC', 'MMI', 'MCS', 'MRIN', 'MHG', 'MPX', 'HZO', 'MKL', 'MWE', 'VAC', 'MMC', 'MSO', 'MLM', 'MAS', 'DOOR', 'MTZ', 'MA', 'MTDR', 'MTRN', 'MATX', 'MLP', 'MVNR', 'MMS', 'MXL', 'MBI', 'MNI', 'MKC', 'MKC / V', 'MDR', 'MCD', 'MUX', 'MHFI', 'MCK', 'MDU', 'MJN', 'MIG', 'MWV', 'MTL', 'MTL ^ ', 'MEG', 'MPW', 'MED', 'MCC', 'MCQ', 'MCV', 'MDLY', 'MD', 'MDT', 'MW', 'MRK', 'MCY', 'MDP', 'MTH', 'MTOR', 'MER ^ D', 'MER ^ E', 'MER ^ F', 'MER ^ K', 'MER ^ M', 'MER ^ P', 'PIY', 'PZB', 'MTR', 'MSB', 'MPG', 'MEI', 'MET', 'MET ^ A', 'MET ^ B', 'MTD', 'MXE', 'MXF', 'MFA', 'MFA ^ B', 'MFO', 'MIL', 'MCR', 'MGF', 'MIN', 'MMT', 'MFM', 'MFV', 'MTG', 'MGM', 'KORS', 'MAA', 'MEP', 'MSL', 'MPO', 'MM', 'MILL', 'MILL ^ C', 'MILL ^ D', 'MLR', 'HIE', 'MR', 'MTX', 'MP ^ D', 'MG', 'MTU', 'MIXT', 'MFG', 'MBT', 'MBLY', 'MODN', 'MOD', 'MC', 'MHK', 'MOH', 'TAP', 'TAP / A', 'MCP', 'MNR', 'MNR ^ A', 'MNR ^ B', 'MORE', 'MON', 'MWW', 'MTS', 'MRH', 'MRH ^ A', 'MCO', 'MOG / A', 'MOG / B', 'MS', 'MS ^ A', 'MS ^ E', 'MS ^ F', 'MS ^ G', 'MS ^ I', 'MSJ', 'MSK', 'MSZ', 'MWG', 'MWO', 'MWR', 'APF', 'CAF', 'RNE', 'MSD', 'EDD', 'MSF', 'IIF', 'MOS', 'MSI', 'MOV', 'MPLX', 'MRC', 'ICB', 'HJV', 'MSA', 'MSM', 'MSCI', 'MLI', 'MWA', 'MUR', 'MUSA', 'MVO', 'MVC', 'MVCB', 'MYE', 'NBR', 'NC', 'NTP', 'NBHC', 'NBG', 'NBG ^ A', 'NFG', 'NGG', 'NHI', 'NOV', 'NPK', 'NNN', 'NNN ^ D', 'NNN ^ E', 'SID', 'NSM', 'NW ^ C', 'NGS', 'NGVC', 'NRP', 'NTZ', 'NLS', 'NCI', 'NVGS', 'NNA', 'NM', 'NM ^ G', 'NM ^ H', 'NAP', 'NMM', 'NAV', 'NAV ^ D', 'NCS', 'NCR', 'NP', 'NEFF', 'NNI', 'NPTN', 'N', 'NSR', 'NVRO', 'HYB', 'GF', 'NWHM', 'IRL', 'NEWM', 'NMFC', 'EDU', 'NEWR', 'NRZ', 'SNR', 'NSLP', 'NWY', 'NYCB', 'NYCB ^ U', 'NYRT', 'NYT', 'NCT', 'NCT ^ B', 'NCT ^ C', 'NCT ^ D', 'NWL', 'NFX', 'NJR', 'NEU', 'NEM', 'NR', 'NHF', 'NEP', 'NEE', 'NEE ^ C', 'NEE ^ G', 'NEE ^ H', 'NEE ^ I', 'NEE ^ J', 'NEE ^ O', 'NEE ^ P', 'NGL', 'NMK ^ B', 'NMK ^ C', 'NJ', 'NLSN', 'NKE', 'NMBL', 'NTT', 'NKA', 'NI', 'NL', 'NOAH', 'NE', 'NBL', 'NOK', 'NMR', 'NOR', 'NCFT', 'NORD', 'NAO', 'NAT', 'JWN', 'NSC', 'NTL', 'NOA', 'NADL', 'NRT', 'NU', 'NTI', 'NOC', 'NSAM', 'NRF', 'NRF ^ A', 'NRF ^ B', 'NRF ^ C', 'NRF ^ D', 'NRF ^ E', 'NWN', 'NWE', 'NVS', 'NVO', 'DNOW', 'NQ', 'NRG', 'NYLD', 'DCM', 'NUS', 'NUE', 'NS', 'NSH', 'NSS', 'JMLP', 'NEA', 'NUV', 'NUW', 'NAZ', 'NBB', 'NBD', 'NKX', 'NAC', 'NCA', 'NTC', 'JCE', 'JQC', 'JDD', 'NAD', 'DIAX', 'JMF', 'NEV', 'JPW', 'JFR', 'JRO', 'NKG', 'JGV', 'JGH', 'JGH / WD', 'NXC', 'NXN', 'NID', 'NQM', 'NMY', 'NMT', 'NUM', 'NMS', 'NOM ^ C / CL', 'JLS', 'JMM', 'NMA', 'NMI', 'NMO', 'NIO', 'NXJ', 'NXJ ^ C / CL', 'NRK', 'NAN', 'NNY', 'NNP', 'NNC', 'NUO', 'NQP', 'NPP', 'JPI', 'JPC', 'NPF', 'NPM', 'NPT', 'NPI', 'NQU', 'NQI', 'JTP', 'JPS', 'JHP', 'JRI', 'BXMX', 'SPXX', 'NIM', 'NQS', 'NXP', 'NXQ', 'NXR', 'NSL', 'JSD', 'JTD', 'JTA', 'NTX', 'NTX ^ C', 'NPV', 'NIQ', 'JMT', 'NES', 'NVR', 'OAK', 'OAS', 'OXY', 'OII', 'OZM', 'OCIP', 'OCIR', 'OCN', 'OFG', 'OFG ^ A', 'OFG ^ B', 'OFG ^ D', 'OGE', 'OIBR', 'OIBR / C', 'OIS', 'ODC', 'OILT', 'ORI', 'OLN', 'OMAM', 'OMG', 'OHI', 'OME', 'OCR', 'OCR ^ A', 'OCR ^ B', 'OMC', 'OMN', 'ASGN', 'ONDK', 'OGS', 'OLP', 'OB', 'OKS', 'OKE', 'OPK', 'OPWR', 'OPY', 'ORCL', 'ORAN', 'ORB', 'OWW', 'ORC', 'OEC', 'ORN', 'IX', 'ORA', 'OSK', 'OUT', 'OMI', 'OC', 'OI', 'OXM', 'PAI', 'ROYT', 'PACD', 'PCG', 'PKG', 'PLL', 'PANW', 'PAM', 'P', 'PHX', 'PAR', 'PGN', 'PGRE', 'PKE', 'PKD', 'PH', 'PKY', 'PE', 'PRE', 'PRE ^ D', 'PRE ^ E', 'PRE ^ F', 'PAYC', 'PBF', 'PBFX', 'BTU', 'PSO', 'PEB', 'PEB ^ A', 'PEB ^ B', 'PEB ^ C', 'PBA', 'PGH', 'PVA', 'PWE', 'PNTA', 'PEI', 'PEI ^ A', 'PEI ^ B', 'PFSI', 'PMT', 'PAG', 'PNR', 'PBY', 'POM', 'PEP', 'PSG', 'PKI', 'PBT', 'PRGO', 'PZE', 'PTR', 'PBR', 'PBR / A', 'PEO', 'PQ', 'PFE', 'PMC', 'PHH', 'PM', 'PHI', 'PSX', 'PSXP', 'PFX', 'PNX', 'FENG', 'DOC', 'PNY', 'PDM', 'PIR', 'PCQ', 'PCK', 'PZC', 'PCM', 'PTY', 'PCN', 'PCI', 'PDI', 'PGP', 'PHK', 'PKO', 'PFL', 'PFN', 'PMF', 'PML', 'PMX', 'PNF', 'PNI', 'PYN', 'RCS', 'PNK', 'PF', 'PNW', 'PES', 'PHD', 'PHT', 'MAV', 'MHI', 'PXD', 'PJC', 'PBI', 'PBI ^ A', 'PBI ^ B', 'PAA', 'PAGP', 'PLT', 'PAH', 'PTP', 'PCL', 'PGEM', 'PNC', 'PNC / WS', 'PNC ^ P', 'PNC ^ Q', 'PNM', 'PII', 'POL', 'PPO', 'POR', 'PT', 'PKX', 'POST', 'PPS', 'PPS ^ A', 'POT', 'POWR', 'PPG', 'PPX', 'PPL', 'PYB', 'PYS', 'PYT', 'PX', 'PCP', 'PDS', 'PJS', 'PGI', 'PBH', 'PVG', 'PRI', 'PPP', 'PFG', 'PFG ^ B', 'PGZ', 'PVTD', 'PRA', 'PG', 'PGR', 'BIN', 'PLD', 'PRO', 'PRY', 'PB', 'PL', 'PL ^ B', 'PL ^ C', 'PL ^ E', 'PRLB', 'PFS', 'PFK', 'PJH', 'PRH', 'PRU', 'GHY', 'PUK', 'PUK ^ ', 'PUK ^ A', 'ISD', 'PSB', 'PSB ^ R', 'PSB ^ S', 'PSB ^ T', 'PSB ^ U', 'PSB ^ V', 'TLK', 'PEG', 'PSA', 'PSA ^ A', 'PSA ^ O', 'PSA ^ P', 'PSA ^ Q', 'PSA ^ R', 'PSA ^ S', 'PSA ^ T', 'PSA ^ U', 'PSA ^ V', 'PSA ^ W', 'PSA ^ X', 'PSA ^ Y', 'PSA ^ Z', 'PHM', 'PBYI', 'PCF', 'PMM', 'PIM', 'PMO', 'PPT', 'PVH', 'PZN', 'QTWO', 'QEPM', 'QEP', 'QIHU', 'QTS', 'QUAD', 'KWR', 'NX', 'PWR', 'QTM', 'DGX', 'STR', 'ZQK', 'Q', 'CTQ', 'CTU', 'CTV', 'CTW', 'CTX', 'CTY', 'RAX', 'RDN', 'RSH', 'RAS', 'RAS ^ A', 'RAS ^ B', 'RAS ^ C', 'RFT', 'RFTA', 'RALY', 'RL', 'RPT', 'RPT ^ D', 'RRC', 'RJD', 'RJF', 'RYAM', 'RYN', 'RTN', 'RCAP', 'RMAX', 'RLD', 'RLGY', 'O', 'O ^ F', 'RHT', 'RLH', 'RLH ^ A', 'RWT', 'ENL', 'RUK', 'RBC', 'RGC', 'REG', 'REG ^ F', 'REG ^ G', 'RGP', 'RM', 'RF', 'RF ^ A', 'RF ^ B', 'RGS', 'RGA', 'RZA', 'RS', 'RNR', 'RNR ^ C', 'RNR ^ E', 'SOL', 'RENN', 'RNF', 'RSG', 'RMD', 'REN', 'RFP', 'RSO', 'RSO ^ A', 'RSO ^ B', 'RSO ^ C', 'QSR', 'RH', 'RPAI', 'RPAI ^ A', 'REV', 'REX', 'REXR', 'RXN', 'RAI', 'RNO', 'RICE', 'RMP', 'RNG', 'RIOM', 'RIO', 'RBA', 'RAD', 'RLI', 'RLJ', 'RRTS', 'RHI', 'RKT', 'ROK', 'COL', 'RCI', 'ROG', 'ROL', 'ROP', 'RRMS', 'RST', 'RNDY', 'RSE', 'RDC', 'RY', 'RBS', 'RBS ^ E', 'RBS ^ F', 'RBS ^ G', 'RBS ^ H', 'RBS ^ I', 'RBS ^ L', 'RBS ^ M', 'RBS ^ N', 'RBS ^ P', 'RBS ^ Q', 'RBS ^ R', 'RBS ^ S', 'RBS ^ T', 'RCL', 'RDS / A', 'RDS / B', 'RGT', 'RMT', 'RVT', 'RES', 'RPM', 'RSPP', 'RTI', 'RT', 'RKUS', 'RTEC', 'R', 'RYI', 'RYL', 'RHP', 'SBR', 'SB', 'SB ^ B', 'SB ^ C', 'SB ^ D', 'SFE', 'SWY', 'CRM', 'SMM', 'SBH', 'SJT', 'SN', 'SD', 'SDT', 'SDR', 'PER', 'SNY', 'SC', 'SOV ^ C', 'SAP', 'SAQ', 'SAR', 'SSL', 'BFS', 'BFS ^ C', 'SCG', 'SCU / CL', 'SLB', 'SWM', 'SAIC', 'SALT', 'SLTB', 'SBNA', 'SBNB', 'STNG', 'SMG', 'SNI', 'LBF', 'KHI', 'KMM', 'KTF', 'KST', 'KSM', 'SA', 'CKH', 'SDRL', 'SDLP', 'SEE', 'SSW', 'SSW ^ C', 'SSW ^ D', 'SSW ^ E', 'SSWN', 'SEAS', 'JBN', 'JBR', 'SIR', 'SEM', 'SGZA', 'SEMG', 'SMI', 'SRE', 'SNH', 'SNHN', 'ST', 'SXT', 'SQNS', 'SCI', 'SERV', 'NOW', 'SSLT', 'SSE', 'SJR', 'SHLX', 'SHW', 'SHG', 'SFL', 'SSTK', 'SBGL', 'SIG', 'SBY', 'SSNI', 'SLW', 'SVM', 'SPG', 'SPG ^ J', 'SSD', 'SHI', 'SIX', 'SJW', 'SKM', 'SKX', 'SKH', 'SLG', 'SLG ^ I', 'SM', 'SFS', 'SNN', 'AOS', 'SNA', 'SQM', 'SLRA', 'SWI', 'SLH', 'SAH', 'SON', 'SNE', 'BID', 'SFUN', 'SOR', 'SJI', 'SXE', 'SCE ^ F', 'SCE ^ G', 'SCE ^ H', 'SO', 'SCCO', 'LUV', 'SWX', 'SWN', 'SSS', 'CODE', 'SPA', 'SPE', 'SE', 'SEP', 'SPB', 'TRK', 'SPR', 'SRC', 'SRLP', 'LEAF', 'S', 'SPW', 'JOE', 'STJ', 'STAG', 'STAG ^ A', 'STAG ^ B', 'SSI', 'SFG', 'SMP', 'SPF', 'SR', 'SXI', 'SWH', 'SWJ', 'SWK', 'SWU', 'STN', 'SGU', 'SRT', 'HOT', 'STWD', 'SWAY', 'STT', 'STT ^ C', 'STT ^ D', 'STT ^ E', 'STO', 'SPLP', 'SCS', 'SCM', 'SCQ', 'SCL', 'STE', 'STL', 'STC', 'SF', 'SFN', 'SWC', 'STM', 'SGY', 'EDF', 'EDI', 'SGM', 'STON', 'SRI', 'STOR', 'STRI', 'SGL', 'BEE', 'SYK', 'RGR', 'SPH', 'SMFG', 'INN', 'INN ^ A', 'INN ^ B', 'INN ^ C', 'SMLP', 'SUI', 'SUI ^ A', 'SLF', 'SXCP', 'SXC', 'SU', 'SUNE', 'SXL', 'SUN', 'SHO', 'SHO ^ D', 'STI', 'STI / WS / A', 'STI / WS / B', 'STI ^ A', 'STI ^ E', 'SPN', 'SUP', 'SVU', 'SFY', 'SWFT', 'SWZ', 'SYA', 'SYF', 'SYT', 'SNX', 'SNV', 'SNV ^ C', 'GJH', 'GJO', 'GJS', 'GJP', 'GJR', 'GJT', 'GJV', 'SYY', 'SYX', 'DATA', 'TAHO', 'TWN', 'TSM', 'XRS', 'TAL', 'TLM', 'TEP', 'SKT', 'TAOM', 'NGLS', 'TRGP', 'TGT', 'TARO', 'TTM', 'TCO', 'TCO ^ J', 'TCO ^ K', 'TMHC', 'TCP', 'TCB', 'TCB / WS', 'TCB ^ B', 'TCB ^ C', 'TCPI', 'TSI', 'AMTD', 'TEL', 'TMH', 'TISI', 'TCK', 'TE', 'TK', 'TGP', 'TOO', 'TOO ^ A', 'TNK', 'TRC', 'HQH', 'THQ', 'HQL', 'TEO', 'TI', 'TI / A', 'TDY', 'TFX', 'VIV', 'TEF', 'TDA', 'TDE', 'TDI', 'TDJ', 'TDS', 'TU', 'TDF', 'EMF', 'TEI', 'GIM', 'TRF', 'TPX', 'TS', 'THC', 'TNC', 'TEN', 'TVC', 'TVE', 'TDC', 'TER', 'TEX', 'TX', 'TNH', 'TRNO', 'TRNO ^ A', 'TSO', 'TLLP', 'TTI', 'TEVA', 'TPL', 'TGH', 'TXT', 'TXTR', 'TTF', 'AES', 'AES ^ C', 'BX', 'SCHW', 'SCHW ^ B', 'CEB', 'SRV', 'SRF', 'DNY', 'GRX', 'GRX ^ A', 'GRX ^ B', 'GDL', 'GDL ^ B', 'THG', 'THGA', 'RUBI', 'TRV', 'TMO', 'THR', 'TPRE', 'TSLF', 'TCRX', 'TC', 'TRI', 'THO', 'TDW', 'TIF', 'TLYS', 'TSU', 'TIME', 'TWC', 'TWX', 'TKR', 'TMST', 'TWI', 'TJX', 'TMUS', 'TMUS ^ A', 'TOL', 'TR', 'TMK', 'TMK ^ B', 'TTC', 'TD', 'NDP', 'TYG', 'TYG ^ B', 'TYG ^ C', 'NTG', 'TTP', 'TPZ', 'TSS', 'TOT', 'TOWR', 'TW', 'TSQ', 'TM', 'TSLX', 'TAC', 'TAI', 'TRP', 'TCI', 'TDG', 'TLP', 'RIG', 'RIGP', 'TGS', 'TA', 'TANN', 'TANO', 'TVPT', 'TRR', 'TREC', 'TG', 'THS', 'TRMR', 'TREX', 'TY', 'TY ^ ', 'TPH', 'TCAP', 'TCC', 'TCCA', 'TRCO', 'TPUB', 'TSL', 'TNET', 'TRN', 'TSE', 'TPVG', 'GTS', 'TGI', 'TROX', 'TBI', 'TRLA', 'TRUP', 'TRW', 'TNP', 'TNP ^ B', 'TNP ^ C', 'TUMI', 'TUP', 'TKC', 'TKF', 'TRQ', 'TPC', 'TWTR', 'TWO', 'TYC', 'TYL', 'TSN', 'TSNU', 'USB', 'USB ^ A', 'USB ^ H', 'USB ^ M', 'USB ^ N', 'USB ^ O', 'USPH', 'SLCA', 'OUBS', 'UBS', 'UBS ^ D', 'UCP', 'UGI', 'UIL', 'UPL', 'UGP', 'UMH', 'UMH ^ A', 'UA', 'UFI', 'UNF', 'UN', 'UL', 'UNP', 'UIS', 'UNT', 'UAL', 'UDR', 'UMC', 'UPS', 'URI', 'USM', 'UZA', 'UZB', 'X', 'UTX', 'UTX ^ A', 'UNH', 'UTL', 'UAM', 'UVV', 'UHT', 'UHS', 'UVE', 'UTI', 'UNM', 'UBA', 'UBP', 'UBP ^ F', 'UBP ^ G', 'USAC', 'USNA', 'USDP', 'USG', 'BIF', 'VFC', 'EGY', 'MTN', 'VALE', 'VALE / P', 'VRX', 'VLO', 'VLP', 'VHI', 'VR', 'VLY', 'VLY / WS', 'VMI', 'VAL', 'VNTV', 'VAR', 'VGR', 'VVC', 'VEC', 'VEEV', 'VTRB', 'VTR', 'PAY', 'VRTV', 'VZ', 'VZA', 'VET', 'VRS', 'VVI', 'VCO', 'VNCE', 'VMEM', 'VIPS', 'VGI', 'DCA', 'V', 'VSH', 'VPG', 'VC', 'VSI', 'VSLR', 'VMW', 'VOC', 'VCRA', 'VG', 'VNO', 'VNO ^ G', 'VNO ^ I', 'VNO ^ J', 'VNO ^ K', 'VNO ^ L', 'VJET', 'IAE', 'IHD', 'VOYA', 'IGA', 'IGD', 'IDE', 'IID', 'IRR', 'PPR', 'VTTI', 'VMC', 'WTI', 'WPC', 'WRB', 'WRB ^ B', 'GRA', 'GWW', 'WNC', 'WBC', 'WDR', 'WAGE', 'WD', 'WMT', 'DIS', 'WLT', 'WAC', 'WRE', 'WCN', 'WM', 'WAT', 'WSO', 'WSO / B', 'WTS', 'WPP', 'W', 'WCIC', 'WFT', 'WBS', 'WBS / WS', 'WBS ^ E', 'WTW', 'WRI', 'WRI ^ F', 'WMK', 'WCG', 'WFC', 'WFC / WS', 'WFC ^ J', 'WFC ^ L', 'WFC ^ N', 'WFC ^ O', 'WFC ^ P', 'WFC ^ Q', 'WFC ^ R', 'WFC ^ T', 'WFE ^ A', 'EOD', 'WAIR', 'WCC', 'WST', 'WR', 'WAL', 'WEA', 'ESD', 'EMD', 'GDO', 'EHI', 'GDF', 'HIX', 'HIO', 'HYI', 'IGI', 'MHY', 'MMU', 'WMC', 'DMO', 'MTT', 'MHF', 'MNP', 'GFY', 'SBW', 'WIW', 'WIA', 'WGP', 'WES', 'WNRL', 'WNR', 'WU', 'WAB', 'WLK', 'WLKP', 'WMLP', 'WBK', 'WHG', 'WEX', 'WY', 'WY ^ A', 'WGL', 'WHR', 'WTM', 'WSR', 'WWAV', 'WLL', 'WHX', 'WHZ', 'WG', 'WMB', 'WPZ', 'WSM', 'WSH', 'WGO', 'FUR', 'WRT', 'WIT', 'WEC', 'WNS', 'WWW', 'WF', 'WDAY', 'WK', 'INT', 'WPT', 'WWE', 'WOR', 'WPG', 'WPX', 'WX', 'WYN', 'XEL', 'XRM', 'XRX', 'XIN', 'XL', 'XOXO', 'XPO', 'XUE', 'XYL', 'YDKN', 'AUY', 'YZC', 'YELP', 'YGE', 'YOKU', 'YPF', 'YUM', 'YUME', 'ZFC', 'ZAYO', 'ZEN', 'ZEP', 'ZPIN', 'ZMH', 'ZB ^ A', 'ZB ^ F', 'ZB ^ G', 'ZB ^ H', 'ZBK', 'ZOES', 'ZTS', 'ZA', 'ZF', 'ZTR'];

    var x = 1;
    console.log(symbols.length);
    var port = 443;

    var options = {
        host: host,
        port: port,
        path: '/request/blp/refdata/ReferenceData',
        method: 'POST',
        rejectUnauthorized: false,
        key: fs.readFileSync('client.key'),
        cert: fs.readFileSync('client.crt'),
        ca: fs.readFileSync('bloomberg.crt')
    };

    var req = https.request(options, function(res) {
        res.on('data', function(d) {
            //console.log(JSON.stringify(d))
            process.stdout.write(d);
        });
    });

    /*req.write(JSON.stringify({
        "securities": ["RSH US Equity"],
        "fields": ["PX_LAST", "OPEN", "EPS_ANNUALIZED", "PQ014" ],
        "startDate": "20150111",
        "endDate": "20150117",
        "periodicitySelection": "DAILY"
    }));*/
    var a = req.write(JSON.stringify({
        "securities": symbols,
        "fields": ["PX_LAST", "OPEN", "EPS_ANNUALIZED", "FINANCIAL_STATUS_INDICATOR"]
    }));

    console.log(a);
    req.end();

    req.on('error', function(e) {
        console.error(e);
    });
    console.log(x);

});

app.listen(8080);