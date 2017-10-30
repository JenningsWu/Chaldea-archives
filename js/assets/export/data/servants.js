import _ from 'lodash'
import Servant from '../../../schema/Servant'

import s001 from '../../data/servants/001.json'
import s002 from '../../data/servants/002.json'
import s003 from '../../data/servants/003.json'
import s004 from '../../data/servants/004.json'
import s005 from '../../data/servants/005.json'
import s006 from '../../data/servants/006.json'
import s007 from '../../data/servants/007.json'
import s008 from '../../data/servants/008.json'
import s009 from '../../data/servants/009.json'
import s010 from '../../data/servants/010.json'
import s011 from '../../data/servants/011.json'
import s012 from '../../data/servants/012.json'
import s013 from '../../data/servants/013.json'
import s014 from '../../data/servants/014.json'
import s015 from '../../data/servants/015.json'
import s016 from '../../data/servants/016.json'
import s017 from '../../data/servants/017.json'
import s018 from '../../data/servants/018.json'
import s019 from '../../data/servants/019.json'
import s020 from '../../data/servants/020.json'
import s021 from '../../data/servants/021.json'
import s022 from '../../data/servants/022.json'
import s023 from '../../data/servants/023.json'
import s024 from '../../data/servants/024.json'
import s025 from '../../data/servants/025.json'
import s026 from '../../data/servants/026.json'
import s027 from '../../data/servants/027.json'
import s028 from '../../data/servants/028.json'
import s029 from '../../data/servants/029.json'
import s030 from '../../data/servants/030.json'
import s031 from '../../data/servants/031.json'
import s032 from '../../data/servants/032.json'
import s033 from '../../data/servants/033.json'
import s034 from '../../data/servants/034.json'
import s035 from '../../data/servants/035.json'
import s036 from '../../data/servants/036.json'
import s037 from '../../data/servants/037.json'
import s038 from '../../data/servants/038.json'
import s039 from '../../data/servants/039.json'
import s040 from '../../data/servants/040.json'
import s041 from '../../data/servants/041.json'
import s042 from '../../data/servants/042.json'
import s043 from '../../data/servants/043.json'
import s044 from '../../data/servants/044.json'
import s045 from '../../data/servants/045.json'
import s046 from '../../data/servants/046.json'
import s047 from '../../data/servants/047.json'
import s048 from '../../data/servants/048.json'
import s049 from '../../data/servants/049.json'
import s050 from '../../data/servants/050.json'
import s051 from '../../data/servants/051.json'
import s052 from '../../data/servants/052.json'
import s053 from '../../data/servants/053.json'
import s054 from '../../data/servants/054.json'
import s055 from '../../data/servants/055.json'
import s056 from '../../data/servants/056.json'
import s057 from '../../data/servants/057.json'
import s058 from '../../data/servants/058.json'
import s059 from '../../data/servants/059.json'
import s060 from '../../data/servants/060.json'
import s061 from '../../data/servants/061.json'
import s062 from '../../data/servants/062.json'
import s063 from '../../data/servants/063.json'
import s064 from '../../data/servants/064.json'
import s065 from '../../data/servants/065.json'
import s066 from '../../data/servants/066.json'
import s067 from '../../data/servants/067.json'
import s068 from '../../data/servants/068.json'
import s069 from '../../data/servants/069.json'
import s070 from '../../data/servants/070.json'
import s071 from '../../data/servants/071.json'
import s072 from '../../data/servants/072.json'
import s073 from '../../data/servants/073.json'
import s074 from '../../data/servants/074.json'
import s075 from '../../data/servants/075.json'
import s076 from '../../data/servants/076.json'
import s077 from '../../data/servants/077.json'
import s078 from '../../data/servants/078.json'
import s079 from '../../data/servants/079.json'
import s080 from '../../data/servants/080.json'
import s081 from '../../data/servants/081.json'
import s082 from '../../data/servants/082.json'
import s083 from '../../data/servants/083.json'
import s084 from '../../data/servants/084.json'
import s085 from '../../data/servants/085.json'
import s086 from '../../data/servants/086.json'
import s087 from '../../data/servants/087.json'
import s088 from '../../data/servants/088.json'
import s089 from '../../data/servants/089.json'
import s090 from '../../data/servants/090.json'
import s091 from '../../data/servants/091.json'
import s092 from '../../data/servants/092.json'
import s093 from '../../data/servants/093.json'
import s094 from '../../data/servants/094.json'
import s095 from '../../data/servants/095.json'
import s096 from '../../data/servants/096.json'
import s097 from '../../data/servants/097.json'
import s098 from '../../data/servants/098.json'
import s099 from '../../data/servants/099.json'
import s100 from '../../data/servants/100.json'
import s101 from '../../data/servants/101.json'
import s102 from '../../data/servants/102.json'
import s103 from '../../data/servants/103.json'
import s104 from '../../data/servants/104.json'
import s105 from '../../data/servants/105.json'
import s106 from '../../data/servants/106.json'
import s107 from '../../data/servants/107.json'
import s108 from '../../data/servants/108.json'
import s109 from '../../data/servants/109.json'
import s110 from '../../data/servants/110.json'
import s111 from '../../data/servants/111.json'
import s112 from '../../data/servants/112.json'
import s113 from '../../data/servants/113.json'
import s114 from '../../data/servants/114.json'
import s115 from '../../data/servants/115.json'
import s116 from '../../data/servants/116.json'
import s117 from '../../data/servants/117.json'
import s118 from '../../data/servants/118.json'
import s119 from '../../data/servants/119.json'
import s120 from '../../data/servants/120.json'
import s121 from '../../data/servants/121.json'
import s122 from '../../data/servants/122.json'
import s123 from '../../data/servants/123.json'
import s124 from '../../data/servants/124.json'
import s125 from '../../data/servants/125.json'
import s126 from '../../data/servants/126.json'
import s127 from '../../data/servants/127.json'
import s128 from '../../data/servants/128.json'
import s129 from '../../data/servants/129.json'
import s130 from '../../data/servants/130.json'
import s131 from '../../data/servants/131.json'
import s132 from '../../data/servants/132.json'
import s133 from '../../data/servants/133.json'
import s134 from '../../data/servants/134.json'
import s135 from '../../data/servants/135.json'
import s136 from '../../data/servants/136.json'
import s137 from '../../data/servants/137.json'
import s138 from '../../data/servants/138.json'
import s139 from '../../data/servants/139.json'
import s140 from '../../data/servants/140.json'
import s141 from '../../data/servants/141.json'
import s142 from '../../data/servants/142.json'
import s143 from '../../data/servants/143.json'
import s144 from '../../data/servants/144.json'
import s145 from '../../data/servants/145.json'
import s146 from '../../data/servants/146.json'
import s147 from '../../data/servants/147.json'
import s148 from '../../data/servants/148.json'
import s149 from '../../data/servants/149.json'
import s150 from '../../data/servants/150.json'
import s151 from '../../data/servants/151.json'
import s152 from '../../data/servants/152.json'
import s153 from '../../data/servants/153.json'
import s154 from '../../data/servants/154.json'
import s155 from '../../data/servants/155.json'
import s156 from '../../data/servants/156.json'
import s157 from '../../data/servants/157.json'
import s158 from '../../data/servants/158.json'
import s159 from '../../data/servants/159.json'
import s160 from '../../data/servants/160.json'
import s161 from '../../data/servants/161.json'
import s162 from '../../data/servants/162.json'
import s163 from '../../data/servants/163.json'
import s164 from '../../data/servants/164.json'
import s165 from '../../data/servants/165.json'
import s166 from '../../data/servants/166.json'
import s167 from '../../data/servants/167.json'
import s168 from '../../data/servants/168.json'
import s169 from '../../data/servants/169.json'
import s170 from '../../data/servants/170.json'
import s171 from '../../data/servants/171.json'
import s172 from '../../data/servants/172.json'
import s173 from '../../data/servants/173.json'
import s174 from '../../data/servants/174.json'
import s175 from '../../data/servants/175.json'
import s176 from '../../data/servants/176.json'
import s177 from '../../data/servants/177.json'
import s178 from '../../data/servants/178.json'
import s179 from '../../data/servants/179.json'
import s180 from '../../data/servants/180.json'
import s181 from '../../data/servants/181.json'
import s182 from '../../data/servants/182.json'
import s183 from '../../data/servants/183.json'
import s184 from '../../data/servants/184.json'
import s185 from '../../data/servants/185.json'
import s186 from '../../data/servants/186.json'
import s187 from '../../data/servants/187.json'
import s188 from '../../data/servants/188.json'
import s189 from '../../data/servants/189.json'
import s190 from '../../data/servants/190.json'
import s191 from '../../data/servants/191.json'

const servantsData = {
  '000': null,
  '001': s001,
  '002': s002,
  '003': s003,
  '004': s004,
  '005': s005,
  '006': s006,
  '007': s007,
  '008': s008,
  '009': s009,
  '010': s010,
  '011': s011,
  '012': s012,
  '013': s013,
  '014': s014,
  '015': s015,
  '016': s016,
  '017': s017,
  '018': s018,
  '019': s019,
  '020': s020,
  '021': s021,
  '022': s022,
  '023': s023,
  '024': s024,
  '025': s025,
  '026': s026,
  '027': s027,
  '028': s028,
  '029': s029,
  '030': s030,
  '031': s031,
  '032': s032,
  '033': s033,
  '034': s034,
  '035': s035,
  '036': s036,
  '037': s037,
  '038': s038,
  '039': s039,
  '040': s040,
  '041': s041,
  '042': s042,
  '043': s043,
  '044': s044,
  '045': s045,
  '046': s046,
  '047': s047,
  '048': s048,
  '049': s049,
  '050': s050,
  '051': s051,
  '052': s052,
  '053': s053,
  '054': s054,
  '055': s055,
  '056': s056,
  '057': s057,
  '058': s058,
  '059': s059,
  '060': s060,
  '061': s061,
  '062': s062,
  '063': s063,
  '064': s064,
  '065': s065,
  '066': s066,
  '067': s067,
  '068': s068,
  '069': s069,
  '070': s070,
  '071': s071,
  '072': s072,
  '073': s073,
  '074': s074,
  '075': s075,
  '076': s076,
  '077': s077,
  '078': s078,
  '079': s079,
  '080': s080,
  '081': s081,
  '082': s082,
  '083': s083,
  '084': s084,
  '085': s085,
  '086': s086,
  '087': s087,
  '088': s088,
  '089': s089,
  '090': s090,
  '091': s091,
  '092': s092,
  '093': s093,
  '094': s094,
  '095': s095,
  '096': s096,
  '097': s097,
  '098': s098,
  '099': s099,
  100: s100,
  101: s101,
  102: s102,
  103: s103,
  104: s104,
  105: s105,
  106: s106,
  107: s107,
  108: s108,
  109: s109,
  110: s110,
  111: s111,
  112: s112,
  113: s113,
  114: s114,
  115: s115,
  116: s116,
  117: s117,
  118: s118,
  119: s119,
  120: s120,
  121: s121,
  122: s122,
  123: s123,
  124: s124,
  125: s125,
  126: s126,
  127: s127,
  128: s128,
  129: s129,
  130: s130,
  131: s131,
  132: s132,
  133: s133,
  134: s134,
  135: s135,
  136: s136,
  137: s137,
  138: s138,
  139: s139,
  140: s140,
  141: s141,
  142: s142,
  143: s143,
  144: s144,
  145: s145,
  146: s146,
  147: s147,
  148: s148,
  149: s149,
  150: s150,
  151: s151,
  152: s152,
  153: s153,
  154: s154,
  155: s155,
  156: s156,
  157: s157,
  158: s158,
  159: s159,
  160: s160,
  161: s161,
  162: s162,
  163: s163,
  164: s164,
  165: s165,
  166: s166,
  167: s167,
  168: s168,
  169: s169,
  170: s170,
  171: s171,
  172: s172,
  173: s173,
  174: s174,
  175: s175,
  176: s176,
  177: s177,
  178: s178,
  179: s179,
  180: s180,
  181: s181,
  182: s182,
  183: s183,
  184: s184,
  185: s185,
  186: s186,
  187: s187,
  188: s188,
  189: s189,
  190: s190,
  191: s191,
}

function pad(str, max = 3) {
  let ret = `${str}`
  while (ret.length < max) {
    ret = `0${ret}`
  }
  return ret
}

const servantMap = _.mapValues(servantsData, s => s && new Servant(s))
const servantList = _.range(192).map(id => servantMap[pad(id)])

export default servantMap
export { servantList }
