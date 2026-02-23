// ============================================================
// Transit DATA — Based on official Klang Valley Integrated Transit Map
// ============================================================
export const LINES = {
  LRT_KELANA:      { name:'LRT Kelana Jaya',    color:'#e31e24', short:'KJ',  type:'LRT' },
  LRT_AMPANG:      { name:'LRT Ampang',          color:'#f5a623', short:'AG',  type:'LRT' },
  LRT_SRIPETALING: { name:'LRT Sri Petaling',    color:'#8b5cf6', short:'SP',  type:'LRT' },
  MRT_KAJANG:      { name:'MRT Kajang',           color:'#0072bc', short:'KG',  type:'MRT' },
  MRT_PUTRAJAYA:   { name:'MRT Putrajaya',        color:'#ffcc00', short:'PY',  type:'MRT' },
  MONORAIL:        { name:'KL Monorail',          color:'#8cc63f', short:'MR',  type:'Monorail' },
  KTM_SEREMBAN:    { name:'KTM Seremban',         color:'#0000ff', short:'KC',  type:'KTM' },
  KTM_PORT_KLANG:  { name:'KTM Port Klang',       color:'#ff0000', short:'KD',  type:'KTM' },
  ERL_EXPRESS:     { name:'KLIA Ekspres',         color:'#800080', short:'KE',  type:'ERL' },
  ERL_TRANSIT:     { name:'KLIA Transit',         color:'#00a651', short:'KT',  type:'ERL' },
  BRT_SUNWAY:      { name:'BRT Sunway',           color:'#006633', short:'SB',  type:'BRT' },
};

// ── LINE SEQUENCES (Ordered for graph edges) ──────────────────────────
export const LINE_SEQUENCES: Record<string, string[]> = {
  LRT_KELANA: [
    'gombak', 'taman_melati', 'wangsa_maju', 'sri_rampai', 'setiawangsa', 'jelatek', 
    'dato_keramat', 'damai', 'ampang_park_lrt', 'klcc', 'kampung_baru', 'dang_wangi', 
    'masjid_jamek_lrt', 'pasar_seni_lrt', 'klsentral_lrt', 'bank_rakyat_bangsar', 
    'abdullah_hukum_lrt', 'kerinchi', 'universiti', 'taman_jaya', 'asia_jaya', 
    'taman_paramount', 'taman_bahagia', 'kelana_jaya', 'lembah_subang', 'ara_damansara', 
    'glenmarie', 'subang_jaya_lrt', 'ss15', 'ss18', 'usj7_lrt', 'taipan', 'wawasan', 
    'usj21', 'alam_megah', 'subang_alam', 'putra_heights_lrt'
  ],
  LRT_AMPANG: [
    'sentul_timur', 'sentul_lrt', 'titiwangsa_lrt', 'pwtc', 'sultan_ismail', 'bandaraya', 
    'masjid_jamek_lrt', 'plaza_rakyat', 'hang_tuah_lrt', 'pudu', 'chan_sow_lin_lrt', 
    'miharja', 'maluri_lrt', 'pandan_jaya', 'pandan_indah', 'cempaka', 'cahaya', 'ampang'
  ],
  LRT_SRIPETALING: [
    'sentul_timur', 'sentul_lrt', 'titiwangsa_lrt', 'pwtc', 'sultan_ismail', 'bandaraya', 
    'masjid_jamek_lrt', 'plaza_rakyat', 'hang_tuah_lrt', 'pudu', 'chan_sow_lin_lrt', 
    'cheras_lrt', 'salak_selatan_lrt', 'bandar_tun_razak', 'bts_lrt', 'sungai_besi_lrt', 
    'bukit_jalil', 'sri_petaling', 'awan_besar', 'muhibbah', 'alam_sutera', 'kinrara_bk5', 
    'ioipuchongjaya', 'pusat_bandar_puchong', 'tmn_perindustrian_puchong', 'bandar_puteri', 
    'puchong_perdana', 'puchong_prima', 'putra_heights_lrt'
  ],
  MRT_KAJANG: [
    'kwasa_damansara_mrt', 'kwasa_sentral', 'kota_damansara', 'surian', 'mutiara_damansara', 
    'bandar_utama_mrt', 'ttdi', 'phileo_damansara', 'pbd', 'semantan', 'muzium_negara', 
    'pasar_seni_mrt', 'merdeka', 'bukit_bintang_mrt', 'trx_mrt', 'cochrane', 'maluri_mrt', 
    'taman_pertama', 'taman_midah', 'taman_mutiara', 'taman_connaught', 'taman_suntex', 
    'sri_raya', 'bdr_tun_hussein_onn', 'batu_11_cheras', 'bukit_dukung', 'sungai_jernih', 
    'stadium_kajang', 'kajang_mrt'
  ],
  MRT_PUTRAJAYA: [
    'kwasa_damansara_mrt', 'kampung_selamat', 'sungai_buloh_mrt', 'damansara_damai', 
    'sri_damansara_barat', 'sri_damansara_sentral', 'sri_damansara_timur', 'metro_prima', 
    'kepong_baru', 'jinjang', 'sri_delima', 'kampung_batu_mrt', 'kentonmen_mrt', 
    'jalan_ipoh', 'sentul_barat', 'titiwangsa_mrt', 'hkl', 'raja_uda', 'ampang_park_mrt', 
    'persiaran_klcc', 'conlay', 'trx_mrt', 'chan_sow_lin_mrt', 'kuchai', 'taman_naga_emas', 
    'sungai_besi_mrt', 'serdang_raya_utara', 'serdang_raya_selatan', 'serdang_jaya', 
    'upm', 'taman_equine', 'putra_permai', '16_sierra', 'cyberjaya_utara', 
    'cyberjaya_city_centre', 'putrajaya_sentral_mrt'
  ],
  MONORAIL: [
    'klsentral_mr', 'tun_sambanthan', 'maharajalela', 'hang_tuah_mr', 'imbi', 
    'bukit_bintang_mr', 'raja_chulan', 'bukit_nanas', 'medan_tuanku', 'chow_kit', 
    'titiwangsa_mr'
  ],
  KTM_SEREMBAN: [
    'batu_caves', 'taman_wahyu', 'kampung_batu_ktm', 'batu_kentonmen', 'sentul_ktm', 
    'putra', 'bank_negara', 'kuala_lumpur_ktm', 'klsentral_ktm', 'midvalley', 'seputeh', 
    'salak_selatan_ktm', 'bts_ktm', 'serdang_ktm', 'kajang_ktm', 'ukm', 'bangi', 
    'batang_benar', 'nilai', 'labu', 'tiroi', 'seremban', 'senawang', 'sungai_gadut', 
    'rembau', 'pulau_sebang'
  ],
  KTM_PORT_KLANG: [
    'tanjung_malim', 'kuala_kubu_bharu', 'rasa', 'batang_kali', 'serendah', 'rawang', 
    'kuang', 'sungai_buloh_ktm', 'kepong_sentral', 'kepong', 'segambut', 'putra', 
    'bank_negara', 'kuala_lumpur_ktm', 'klsentral_ktm', 'abdullah_hukum_ktm', 
    'angkasapuri', 'pantai_dalam', 'petaling', 'jalan_templer', 'kg_dato_harun', 
    'seri_setia', 'setia_jaya_ktm', 'subang_jaya_ktm', 'batu_tiga', 'shah_alam', 
    'padang_jawa', 'bukit_badak', 'klang', 'teluk_pulai', 'teluk_gadong', 
    'kg_raja_uda', 'jalan_kastam', 'port_klang'
  ],
  ERL_EXPRESS: [
    'klsentral_erl_ex', 'klia1_erl_ex', 'klia2_erl_ex'
  ],
  ERL_TRANSIT: [
    'klsentral_erl', 'bts_erl', 'putrajaya_sentral_erl', 'salak_tinggi', 'klia1_erl', 'klia2_erl'
  ],
  BRT_SUNWAY: [
    'setia_jaya_brt', 'mentari', 'sunway_lagoon', 'sunmed', 'sunu_monash', 
    'south_quay_usj1', 'usj7_brt'
  ]
};

// ── INTERCHANGES — Walkable cross-line connections ─────────────────────
// Any stations grouped here will be connected in the graph with a transfer penalty
export const INTERCHANGES = [
  ['klsentral_lrt', 'klsentral_mr', 'klsentral_ktm', 'klsentral_erl'],
  ['masjid_jamek_lrt'], // Internally connects KJ, AG, SP lines
  ['pasar_seni_lrt', 'pasar_seni_mrt', 'kuala_lumpur_ktm'],
  ['titiwangsa_lrt', 'titiwangsa_mrt', 'titiwangsa_mr'],
  ['hang_tuah_lrt', 'hang_tuah_mr'],
  ['bukit_bintang_mrt', 'bukit_bintang_mr'],
  ['trx_mrt'], // Connects KG and PY lines
  ['maluri_lrt', 'maluri_mrt'],
  ['chan_sow_lin_lrt', 'chan_sow_lin_mrt'],
  ['sungai_besi_lrt', 'sungai_besi_mrt'],
  ['putra_heights_lrt'], // Connects KJ and SP lines
  ['bts_lrt', 'bts_ktm', 'bts_erl'], // Bandar Tasik Selatan Hub
  ['kajang_mrt', 'kajang_ktm'],
  ['sungai_buloh_mrt', 'sungai_buloh_ktm'],
  ['kwasa_damansara_mrt'], // Connects KG and PY lines
  ['plaza_rakyat', 'merdeka'], // Pedestrian walkway
  ['dang_wangi', 'bukit_nanas'], // Pedestrian walkway
  ['ampang_park_lrt', 'ampang_park_mrt'],
  ['abdullah_hukum_lrt', 'abdullah_hukum_ktm'],
  ['subang_jaya_lrt', 'subang_jaya_ktm'],
  ['usj7_lrt', 'usj7_brt'],
  ['setia_jaya_ktm', 'setia_jaya_brt'],
  ['putrajaya_sentral_mrt', 'putrajaya_sentral_erl'],
  ['kampung_batu_mrt', 'kampung_batu_ktm'],
  ['muzium_negara', 'klsentral_lrt', 'klsentral_ktm'] // Pedestrian walkway
];