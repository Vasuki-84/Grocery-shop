import { Product, UserRecord } from './types';

export const CATEGORIES = [
  { id: 'Grocery', name: 'Grocery', label: 'Fresh Produce', icon: 'storefront' },
  { id: 'Stationery', name: 'Stationery', label: 'Premium Stationery', icon: 'edit_note' },
  { id: 'Juices', name: 'Juices', label: 'Pure Refreshments', icon: 'local_cafe' },
  { id: 'Personal Care', name: 'Personal Care', label: 'Personal & Skin Care', icon: 'spa' },
  { id: 'Household', name: 'Household', label: 'Household Essentials', icon: 'cleaning_services' }
];

export const PRODUCTS: Product[] = [
  // GROCERY
  {
    id: 'g1',
    category: 'Grocery',
    name: 'Fresh Tuscan Kale',
    subtext: 'Fresh leafy greens directly from the cooperative.',
    price: 4.50,
    badge: 'Organic',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBsGEIvfRXWxS0SRdNTizLa4uoWdgyua4ft21VcSFXkf2k19mk_pDWy3Sou05iCPE2W9zy1AZtz42DHGvHFHfSZxmP6mXIQLm4Us04NiNAZBQfm5pV4jvy-ny-HHbRHJWNFRYkWDRI6X1bNtLHvYEcwVIXsJRyKTLaq7rntrMg9Pevledp4nCyOi_8zrdnt_uL3vCfZjZS3MRKYxmzkvzVBghWKXmhhDkDjsi4GME2-6f3K59zSLD0aBfTUgtXq037B0RhBCtJZ-Fo',
    rating: 4.9,
    reviewsCount: 124,
    description: 'Crisp, nutritional powerhouse harvested daily. Perfect for matching any premium green salad or smoothie recipe.',
    isOrganic: true
  },
  {
    id: 'g2',
    category: 'Grocery',
    name: 'Ripe Hass Avocados',
    subtext: 'Creamy high-quality avocados on a clean marble tray.',
    price: 2.99,
    badge: 'Top Rated',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDVk1vBIoDLjux9H6aK5Wbo9S6KTAGqCvM1x6xEEGbcHQFMN6T5GQ8ZgJNK2-e-1iLD7NevoR-m11ufF5xVxX8tAeNL5nPNuNELmGZo3-iYymCq-1BE3diS336_pl0L76poRXxOWYoRwXi9qsVeRP31ZL-OG9uAff8bmrAdZkFrjVNMjfK_4TZnix3mZwd4vlhBFeOQW2N5c0-FSD-QT4QIUsLiu0gH2vCpcCwsEt4lb_-QIRz_GkHsgPTD_FqIK8Ds7ForH3ih6jk',
    rating: 4.8,
    reviewsCount: 420,
    description: 'Rich, velvet-like texture and nutty flavor profile. Ready to eat within 24 hours of arrival.',
    isOrganic: true
  },
  {
    id: 'g3',
    category: 'Grocery',
    name: 'Vine Tomatoes',
    subtext: 'Plump red cluster tomatoes glistening on kitchen counter.',
    price: 3.25,
    badge: 'On Sale',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYX2E24izL5qsUcf6qIUsU7_aTFRFWnD3S8AQvTCRiNtu9T2-laRHZZ8_YHPEci84AnDOcNUBXmMTicbXDd9LQqCaq4hGaXLE-r9p9HKb5bGHFrEqBdvCTdUjpknxiOq6Ji5wulkFWWzCoihGbXQPYUStc_l0xAUhepIW3Wyjf1SmTwQSk3tLWvW3sKOqBuCv9Pm9EV4vdFwa4ik9hKKOIDnLCvZisqOnnTrE96ebl337V87su0ENNHggYt7bxLu_8a5-o9aKRA1Q',
    rating: 4.7,
    reviewsCount: 95,
    description: 'Sweet, full-bodied aromatic flavor. Vine-ripened, hand-picked, and delivered with maximum preservation.',
    isOrganic: true
  },
  {
    id: 'g4',
    category: 'Grocery',
    name: 'Premium Bananas',
    subtext: 'Bright yellow organic bananas with zero blemishes.',
    price: 1.50,
    badge: 'Bulk Deal',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCU-aBra_yogubfeBK1gNxA4ODOKqwiTNhr4ccrFIj3J6xZiiUOQUeVRuxFhMEJxl9Eqp7Pi3nOzTO0w5L-veeJ4L-1-QV3unzBDdSgIM4TI9bPVUhAb-SY0VfVAsRMZFVAXJopdLUsOoo-uMa8DaZU7LFX7pnRHLbfLHVstAocIKFsPyLivbflvT1ZDmsRbYQOxmkVTQarZE1WRn_VaqziWeDcwEoVigUHJRD7gJR3Vbvbv1z3uJV0pZo8c6xJjbgTAubHde7Qh-w',
    rating: 4.9,
    reviewsCount: 1200,
    description: 'Rich in potassium and perfect for quick breakfasts or healthy snacking. Sustainably farm-sourced.',
    isOrganic: true
  },
  {
    id: 'g5',
    category: 'Grocery',
    name: 'Pure Orange Juice',
    subtext: 'Fresh cold-pressed citrus juice with light condensation.',
    price: 6.99,
    badge: 'Cold Pressed',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDWwY8nYiVXL-sUVUI59UNR65Bc4Uc99QMDDxBj3YprguBkBypTQ8pGbHKHiQcjLDi_p7fuaEIS4zXbYFFMf0SabLEq6KBcaUPRQewL7bhqzisOBeGzpe8cHGfJAGkqm1Onroj-vJ7shlraRx5Rl4U2uinIjPrCsyfjviAiio6K831uQQ9xiJPZ6roPqvNtBPvajDRqz1uzu0p6csKQoIMjSxsaY-RczmslvHEjDiC3EIcBy0Jo_il-j3HxpkbKigEEp9fDA3m5oU',
    rating: 4.6,
    reviewsCount: 220,
    description: '100% pure cold-pressed Florida oranges. No water, no concentrates, and zero external sugars.',
    isOrganic: true
  },
  {
    id: 'g6',
    category: 'Grocery',
    name: 'Mixed Berry Pack',
    subtext: 'Sweet plump assortment of strawberries and blueberries.',
    price: 8.50,
    badge: 'Antioxidant',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1_8oQ7GvkOkFzDEopOCmZZbdAzIjCE50MI2s6zUpX69zZrS_6CMKLam0_2ynNn1wI0Kmejuw4jqy8RYKy8jA85N-jMsJAZOUFVosghAuS--r8_nXI9WzZREX9zijbpbmBlv0o5Bde0JMSi9fOVNa2HJcUzA6ufYg5kxpu492_72juWxVMkunGbflm36YyEsdsSEy-9C5m_AhiPXkPr2Uzmx2s_RmF2Cu2sMRHQw2p2lOvnF1aZKruc12JZD5DECEP7XR1rISDdLA',
    rating: 4.8,
    reviewsCount: 312,
    description: 'Juicy blend of premium fresh picks. Highly robust nutrient profile, packed with pure natural energy.',
    isOrganic: true
  },

  // STATIONERY
  {
    id: 's1',
    category: 'Stationery',
    name: 'Linen Bound Journal',
    subtext: 'Sage green notebook with a luxury heavy paper text cover.',
    price: 24.00,
    badge: 'Grocify Select',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgAyHu9q5TV3Zv45yBdwNymHH2mnETrA3DP8jAvRPyupy60X0rnEwkFFktw-52xiVonFTjWtt-PJaxteaqJVqYRUfsz2-0gJ2dTI-6Yzxnj-Vq3h3wfIzDokA4n67tc7_nv-xQtxo5xVlxoeY7BlF6JatNuX4jyXZADj0s16XLKjswi03OPvwMbSiYiyWVzEmBycSczmHkyiqscsugnpvcGUVB6C2qbK038C-BiNyyxI2-KL_LX5NyYPM3yOaJLdzJafvYHSzOmiY',
    rating: 4.9,
    reviewsCount: 154,
    description: 'Heavy 120 GSM ink-friendly journaling pages bound in clean sustainable certified linen.',
    isOrganic: false
  },
  {
    id: 's2',
    category: 'Stationery',
    name: 'Executive Matte Pen',
    subtext: 'Sophisticated metal fountain pen with polished chrome accents.',
    price: 45.00,
    badge: 'Premium',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCidSUQdtsdyBDynXClK2R7ei4snhm7aB4HBI3iXHcU1g1xk03_snEDpusUJOkypgSo2uBXfqvIfCfCIzT5hhinOab6C12gw-ua0W0IN3YsPNWYf23Bb9o41S30WMZC_5ttIv7JcTbeUbwGTH56xsT8rZjYv0YJ9sH_5a1C6QzQEKFMEFqO-rOp3OnYfDlAvAQ-G8Ri5adQDxBFuUJmLkNxk-iZaQInPhwuQ5IqQMYGyKEGyQp9rq1APikftD9-DxZGpKLoIRMIioY',
    rating: 4.8,
    reviewsCount: 290,
    description: 'Black liquid ink, completely refillable design. An essential for any modern desk catalog.',
    isOrganic: false
  },
  {
    id: 's3',
    category: 'Stationery',
    name: '2024 Weekly Planner',
    subtext: 'Warm cream-toned minimalist organizer with leather cover.',
    price: 32.50,
    badge: 'Essential',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDT_G6HcPhGGaRoHP5FVPF3cGDwGQEsf0f8gu0h8Mtg6YO6zWXNLSbcvly7Fj3BSrC1EF5u5Swmf0Qv0epf6jtliJjl8HeBWwKOdoEp-6dcyLJUD-zym4YR88Cb3Nu9peLD5Wk3sxTxT2JciTWk7SmV0Ix5L0mottBSrsy1V-M1JwpgIouGJ7BdMrUUgWafTsT4XBFMiSi6VgHhKKISJYT7LN1m5HMkRZX7M4cbCD6SxR4r5Ghgs5bRAv8-GEnZPlUMhGVdvjDDpOw',
    rating: 5.0,
    reviewsCount: 42,
    description: 'Eco-conscious acid-free parchment. Elegantly embossed and structured for daily task optimization.',
    isOrganic: false
  },
  {
    id: 's4',
    category: 'Stationery',
    name: 'Brass Desk Set',
    subtext: 'Solid metal paper clips residing on an oak tray holder.',
    price: 18.00,
    badge: 'Artisan',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjtsP4ISyFdlQBRSvPmPOjI3GuHOalPQQr2s84q-rsKukqOtlaJiUPkkrMyWoTCuhi1VO3iE3jVFUOVFDA9EAgFFxF1kbDBXP_r_O3YIJV6U1TnPlbzieqvrzboifkR_Mkvb1fxKkVE6dyRKM82hY3WMu92OEI6JIIA0pJTH7bsLblP3sSPSZOcObtgnIcyphyMZFWs1zeYcqMjWdu-PDbti1LeF9bFgJHbw_0DmlmsOQOGm9LePnWmBQ78fp7jmr9ROlr7rBbnr4',
    rating: 4.6,
    reviewsCount: 54,
    description: 'Minimalist paper organizer set crafted of real brass that gracefully patinas over several seasons.',
    isOrganic: false
  },
  {
    id: 's5',
    category: 'Stationery',
    name: 'Dual-Tip Brush Pens',
    subtext: 'Rich gradient sketch pens in forest green shades.',
    price: 14.90,
    badge: 'Creative',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgjITFrDEcBRw0H3TkfvQM4lrbtxOEyj66fe2hIzcpz4QClI-6JO8OI1ukdhVVFdmqXxK4SPt2dbxKxRboEgtT_IDbGq9QUyhg58PJPYrEK_gNwq238JX67I4XHSFP7UZkhaT8-QZ9nUA5VXXZJXcoh02rAVcY1clprS7T4eZVZ8y3Yo4qIJtDlHKEgaHmPYc9AHenCMgCvRR-0bq1S8YeE4VL26aUNaM9Sl8sve43qC4rQbnkwDr2yzGJGzlYEVvPZ0H2jYMwikk',
    rating: 4.7,
    reviewsCount: 88,
    description: 'Set of 6 high-pigment professional brush pens. Features bullet and soft brush heads.',
    isOrganic: false
  },
  {
    id: 's6',
    category: 'Stationery',
    name: 'Acrylic Desk Organizer',
    subtext: 'Transparent high-end stationery pen stand stack.',
    price: 29.00,
    badge: 'Office',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6yKb6g5gnyBTzVhpE2RNZcrMiYoTaIE54N2wKt0X6BHutW3Pd2XfPic1L4lLnYxr39okYPYSUyHvHKWR-oTBZVnE4hxLC4N2cyZ8y2_68bD4i2RpaFAAMOgmJ8bArbovbdMf6BF1COVEROwaWqnWTH9W_DL9lGVK0Hi5HJqIn9E1BZaIupheYI0w3wZUpb_0TldYswRxutBMIlSFBupuOtMo0O27vpqzX8Lu0z3fY5mAb0sHEThyaDNcpjs5vp4YDw7-AjT4oZfM',
    rating: 4.8,
    reviewsCount: 110,
    description: 'Precision heavy acrylic. Modular construction provides scalable organizer sizes on request.',
    isOrganic: false
  },

  // JUICES
  {
    id: 'j1',
    category: 'Juices',
    name: 'Emerald Green Detox',
    subtext: 'Cold-pressed green bottle with healthy condensation.',
    price: 8.50,
    badge: 'Organic',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAbV0sLnqNkfKmXm2nEvdwdDBF9_OYJShfz1hn0odmRv1Wu2r8XZAKNOQxMcQh0n6IG_fAiwWnSacJrdSkVNLwafpxx1S8fWu9o0ojsfVsXk0fTpuEuaq5FRdDIAtGy_rozwNNI0vzUAw8-ulx5Hi20j6d0wJmbbCxTWBmoYcUvvIDXWwRdOCv036T0BvvOYaplCcg5tLhoP-3Cepbteem_pDW9hPcaKnw4claNv-ID6EIJKsTnmyl_hNnyQMcmTLtL1vkKx-eRLus',
    rating: 4.9,
    reviewsCount: 412,
    description: 'Kale, Spinach, Apple, Ginger, Lemon. Pure, crisp taste profile with premium nutritional elements preserved.',
    isOrganic: true
  },
  {
    id: 'j2',
    category: 'Juices',
    name: 'Golden Turmeric Glow',
    subtext: 'Vibrant turmeric orange container under crisp sunlight.',
    price: 9.20,
    badge: 'On Sale',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDc2P6ngA_rUKi8R7vx1-eJwytCa0bzR2jjrpWHFmkCAAdznV4krYbN68aqW70Zz-2msC7bS5ESvgoezGUezB92Ee_fseuU1CSh4WKENsSJ3szRJh-qv6s-uiIPkeDhVHVANSvF2Befbx4gxLKvVNceM_vc419dFkzelpKz_wU9IdQQGHo1dDLyxhdFjV2c1G1Wn6WUwqUNHxv14ZpHNESgN__pAks6Ev4l69yTI7xyam3M10jQmG27cU0ZIKNQ888fGCOLZYyGyCI',
    rating: 4.7,
    reviewsCount: 180,
    description: 'Carrot, Orange, Organic Turmeric, Black Pepper. Energizes, refreshes, and brightens your morning routine.',
    isOrganic: true
  },
  {
    id: 'j3',
    category: 'Juices',
    name: 'Artisanal Lavender Mist',
    subtext: 'Lavender sprigs and lemon slices inside a custom cork decanter.',
    price: 7.75,
    badge: 'Top Rated',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANG2qyS1d68VrHly-sny-lMwXEPewmWFFUBiA4mpF6bNYkmw_RdMrjmr24sQnbv8GkkM_xkoh4hIcKFL2WlIaf9Vf_2O044LEjkJ-7SUjOIM0KrooZpp-vshq4KDHiA6wYIM5gPV5PObbeE0FcXK3cX1lMiClWQWe8XaaZN4pTmLLlDsno47DyYGEkomxud_Rl5iuDxt5kU3o2ag4NwYxnNNj3TaleBXQjPfTpsseGbRrTh1-wmjuqdtNhl1HIMUZSNISkRyho2yo',
    rating: 4.8,
    reviewsCount: 195,
    description: 'Lemon, Wild Lavender, Agave, Blueberries. Exquisite recipe delivering unparalleled refreshment.',
    isOrganic: true
  },
  {
    id: 'j4',
    category: 'Juices',
    name: 'Ruby Beetroot Surge',
    subtext: 'High-density deep ruby red beetroot smoothie in glass bottle.',
    price: 8.90,
    badge: 'Best Seller',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCw8T3gjrVOpl634BUjwikfkqxshGoiZn1zgeJDnHDP_iMTpo2Pr_vz32QjjNWFll4ndgWxAYqE1MuSCVM-XVAQ_x3AlxXsfOQqyFkZMj5-ElobDn-xviAl3MiC-QczqBCGd32AukdpIw9X42KCqAaMWf91UT4XDCTVUE68Lb0IpkrtLoPsZ8_TorMZZUp3L24oN695fIT0Ca8h8Fc6PHuczHAOksvA9zQEYeK_FEiLDUcMDKTqRPwkkpf3uAS8yL_5eqeVdjX_fq0',
    rating: 4.7,
    reviewsCount: 243,
    description: 'Beetroot, Pomegranate, Apple, Lime. Deep rich natural pigments full of crucial body antioxidants.',
    isOrganic: true
  },
  {
    id: 'j5',
    category: 'Juices',
    name: 'Activated Detox Lemonade',
    subtext: 'Striking jet-black lemonade with yellow lemon wheel garnishes.',
    price: 9.50,
    badge: 'Cold Pressed',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDxHewLVaj38IUD1ZkR6QPFn0MU8xTs8-c_d77eVl3xHCCMMazQV1tdx6_8etXvEKUg6LS4SvCMqJr2H_97pViHk3ykOJugkSDYKjRelFSZMpGUIsb6kMLKMf8xubQNQMNyciO6mOmZzil63S1Cu7vSjcgqIPVJuslgtqx11ubFEV-E2-wsQW5-3U93V-TkQ3LE-0yd5YkbGe35rxkApWUgi5MxElSx63xv0AHlkG71OgNiEQsWKtT1EJphtVIgBUtmePYacwdawCs',
    rating: 4.5,
    reviewsCount: 112,
    description: 'Activated Charcoal, Lemon, Himalayan Salt. Aids clean cellular detoxification and electrolyte balances.',
    isOrganic: true
  },
  {
    id: 'j6',
    category: 'Juices',
    name: 'Tropical Ginger Zest',
    subtext: 'Vibrant golden pineapple ginger elixir top-down portrait.',
    price: 8.25,
    badge: 'Antioxidant',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAP1fjdl2YrWPcu5pvNtfzjwEm_h1keHMrhNtl4B-OCS3vHTdfKbIWd3dGCgqxh76xugwpNIzOb7Uz6RZPFzHHWvDRW8S1xRsKlWPm29zaHBaXF2PFcYHi5coYi_C8QUNTGWX4k-Bnegc0MUB8kElJfud29iEstnub91Vxe51JFmKN4iVIkV7hDDkS3Uppyr8qCSZ68X3URVHSNPpGiaC7zqZzw5kbUpNPVPbfcksl4l15fu8JQeKnWGrY7yyPEK7X4OWY8expzigI',
    rating: 4.8,
    reviewsCount: 167,
    description: 'Fresh Pineapple, Spicy Ginger, Fresh Peppermint, Apple. Sharp kick of warmth and tropical fruit sweetness.',
    isOrganic: true
  },

  // PERSONAL CARE
  {
    id: 'p1',
    category: 'Personal Care',
    name: 'Lavender & Silk Soap',
    subtext: 'Aromatic soap block with real embedded active botanical bits.',
    price: 12.50,
    badge: 'Handmade',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC6J-CKeQ9__0I1-kBpV7y-otMiWn8yzrSHMlcgXSCqzo0d5IMf34GD7sIvqbh4yL2qJWQNVQCGGS73iDuyrc1a7br8K9s3NYgFNyddql5hNBj4oJ-iIdE9BFghf0HsPkXZUekQuUPL6zf7dDgg2pmogZCypKRIqqo77zlbmohyG5r552nt8BssPd53nKM5VFPfWlcYcQxeWWjpSXwu_hwqwRdj6FjtlTYgLnB2_WX2LPAMwBwxI8KJEhRWXe_G2cVc7i7w2h_Xpl4',
    rating: 4.9,
    reviewsCount: 345,
    description: 'Infused with French lavender extract and luxury silk peptides. Keeps skin moisturized and smooth.',
    isOrganic: true
  },
  {
    id: 'p2',
    category: 'Personal Care',
    name: 'Herbal Revive Shampoo',
    subtext: 'Elegantly packaged amber glass bottle with a clean black pump head.',
    price: 24.00,
    badge: 'Botanical',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBdrjWhsUystqd1U8wVu7Ro4TSS-YVJB-BJYW1M8IG9UP3fD7b-X1-ccnondIDF27-6qw2NdhRjSJQcOO7V1v611oyuASXGxNI1SoxIMFjLc-lYvYl-elRlaaus-Zg6hZ4I6Q1pvp893esR97QsGNG17vJ_Iq_TuGKErl1AodvclZ7fNbrSYNXxYjk2E7duizSykhw82_vT7SJfAdUzmywEkkQRk_hFV_94M1LXf25c0a52yYnIWf6pgbphkGC-6CW1h8SegdHDXtA',
    rating: 4.8,
    reviewsCount: 550,
    description: 'Refreshing rosemary and wild peppermint infusion. Strengthens hair follicles naturally and restores shine.',
    isOrganic: true
  },
  {
    id: 'p3',
    category: 'Personal Care',
    name: 'Dewy Face Cream',
    subtext: 'Frosted jar showing an whipped organic hydrating lotion cream.',
    price: 38.99,
    badge: 'Organic',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAEVffaVfbWyBvTiW78yrvW6B4bpVxHTZ6Dn78C9mciyQjyC13ny8cP7gqx_QyGm6kHNOPe8PPZL3EAAWGqbU3UPKWuGZfa_KJplT46HHgt6X8Y-V5fN4wNKmv9Rgw4z3oLqs-kRJoQVTTsMaoAx9DYJyEbHA0zcTQhBitR0oQOdm5g7PhZ6L_r5rvhWSqQGOzjVEIx14MYJhLPtkWSOzxynohBJF03Se7657TwZPFONrzQCt1IdVV9fkbygtlyyzqY50M0Rdf6uMQ',
    rating: 4.9,
    reviewsCount: 228,
    description: 'Active plant hyaluronic extracts combined with cold-pressed aloe. Locks in lightweight moisture for 24 hours.',
    isOrganic: true
  },
  {
    id: 'p4',
    category: 'Personal Care',
    name: 'Golden Jojoba Body Oil',
    subtext: 'Rich golden body oil bottle on Terracotta backdrop with white detail.',
    price: 22.00,
    badge: 'Nourish',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwP4ECmfq1GvkPkuit4mlXyfbHyWj00PoyxIMs1anZb4Q8xg-hC2IvQZv84i2-FI02UiV76-gPYkg9KbEWgItOtMjpGC39HnxuhnIixsgG8xcGXBK0DYEZ2edoeVVqTT6AY0NaOlU18Hk1eNuzSY-urjZMOuPxsU89zWmtvhd77DZKKWceT7GnZARFALbRX7QJtfqZ1DxEA_cvqySwlzb0q72i_KGq0Mfam6E7z7jc-knSeoGvGs4zxTtHZPa-iROOEqF-MrH59n8',
    rating: 4.7,
    reviewsCount: 164,
    description: 'Infused with cold-pressed golden jojoba grains, vitamin E, and essential oils. Absorbs quickly without residue.',
    isOrganic: true
  },
  {
    id: 'p5',
    category: 'Personal Care',
    name: 'Eucalyptus Silk Conditioner',
    subtext: 'Minimal matte conditioner bottle residing among fresh tree leaves.',
    price: 26.50,
    badge: 'Smooth',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD1xhTbOyaCdMB5ipM9yK0LTLy6bvpJd_5HWFtEkzy2kxqSaDbCQZgCSqZLi8vsD6IWZ1QNtoNTrAjjPjB7F9aIDgKs7eqr46djh7add2fpsQx9dkNoXUfkZFDS25OuL_svVb5qq7JOCb3-_Y9p1I5iSPrIhsQEtMzv2l8pUpgDmdmkBF8D1YczBZ7BxnwqbGdHHlFgFW5_RmHfh93P_eP43VQesUcC_AmL9IQUOqmDkwHb7MG7PHcCsz5cianMhJnu9hLvqvJI5Q0',
    rating: 4.8,
    reviewsCount: 395,
    description: 'Tangle-free premium silk proteins and eucalyptus leaf essence. Promotes hair density and soft texturing.',
    isOrganic: true
  },
  {
    id: 'p6',
    category: 'Personal Care',
    name: 'Volcanic Ash Clay Mask',
    subtext: 'Mineral-rich dark mud cream in glass jar with wooden spatula.',
    price: 32.00,
    badge: 'Detox',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcOyi0HG5eUnwKJzFdPN8V0nOt4PMSDEpJHEc_UOL8X3u_KNAZol1_3JOeGyjAK7NfP2p4WHjFp15gj6SGguKNZwz2MdZCBd_CrqzTymV0WQ9m_43rRXPacmljbwNXKu4ATNWIOoF1F8g93ASj3RW5EQb0Q0w3iBKYcgWAF6teb3VXFfylIV-7fjdh7dHll9vVSg-fwCdoISk1yvFbOhZ1qDfsp6zXUPotBqdws5io-e2ZDLvA62dpyEqxl74s-bXxrNN5Aoe_H9Q',
    rating: 4.6,
    reviewsCount: 140,
    description: 'Pore-refining volcanic clay. Draws out deep toxins, purifies, and tightens pores.',
    isOrganic: true
  },

  // HOUSEHOLD
  {
    id: 'h1',
    category: 'Household',
    name: 'Liquid Lavender Detergent',
    subtext: 'Minimal froste-glass eco laundry wash bottle with bamboo cap.',
    price: 18.50,
    badge: 'Bestseller',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdU9EsSF4Jkoah7voqiuUNSJUDQPyOJZrOQ2Wtkf69hiHmgLWm-ruWquFhxHyVspgWm2W9vn82RLI2eWzspS_fPag2FALf8laaRHJtpiTp7a9tEJIa5kj6nwg18iiIVv5asIT2A1k_RaAxekmxJ40Hibj_wk6eGDgKy9xBuY15oYjdOLDfF8r_noLT2gK471wuJ6Ft-odpEaoF87RQ9kuLZUX_7UUp7dWRKX7VR4OmxMo_nfAwhJ4YD1DeOxWwBr_tQoeFY4zFA8I',
    rating: 4.9,
    reviewsCount: 1200,
    description: 'Biodegradable cleaning base infused with lavender organic essential oils. Tough on dirt, gentle on skin and fabric.',
    isOrganic: true
  },
  {
    id: 'h2',
    category: 'Household',
    name: 'Organic Lemon Zest Dish Soap',
    subtext: 'Fresh clear recycled plastic dishwashing pump under kitchen rays.',
    price: 7.99,
    badge: 'Eco-Refill',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC9uv1xqLIbSeDYwsczLfIpoSFOwi7BFTtDpWqXEBdMxO__-IXet0HSqvr4sGnL4O3xWMKAd2W1eBj2nSFantoxGMoMKX3sQlkUZVTEuIQpR400zzqexhpeIOIdSP9XkPWxcCqNW16XcZYIOeY3SwJygVx4zpky5_SKVAe4hP8DCuFiX4oEsCsn4u1zLOfj3H7YZGG17-29ltwNejot1KOBtSUvJX78I2Hz_FEoWXqQ2J-yrrISUH7WM17C3nk8Ws2DpuKN1Jd_UzA',
    rating: 4.7,
    reviewsCount: 850,
    description: 'Grease-cutting lemon enzymes. Eco-friendly solution that washes dishes sparkling clean in seconds.',
    isOrganic: true
  },
  {
    id: 'h3',
    category: 'Household',
    name: 'Sustainable Bamboo Scrub Set',
    subtext: 'A collection of beautiful Sisal bristle brushes with wooden handles.',
    price: 22.00,
    badge: 'Bestseller',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDZM8C3B5MUF7-Ym1qMbJEWjRgbCziIMd89HOuWUP6M3VhuumyRVO_th925FqPz2hONaAOVKGcxn0HS184i-uFRgf3r2VbkK_3XAJOs6pp2brf7nbC3urOtq1nw_EEjNkA_Eip6tU28LTRj0U_dv_hFHUjf_-mJByQXuNJdw2gaGADxwfwqoC8pSDxQn9aqaMq3FPyO8JmhzSCYWCl2Uxmo0R9IFkepAKoF-5n_2IdcbqRVVa7qeCV6RM8gH6SC9mxYDKd94D8cuPk',
    rating: 5.0,
    reviewsCount: 42,
    description: 'Includes four multipurpose botanical scouring brushes bound with genuine fibers. High durability, zero plastic waste.',
    isOrganic: true
  },
  {
    id: 'h4',
    category: 'Household',
    name: 'Multi-Surface Eucalyptus',
    subtext: 'Concentrate liquid soap container residing on clean utility top.',
    price: 24.50,
    badge: 'Bestseller',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjBWKV0AAXMQwF-OuDFvuYfwOuhq7gWc0XLJvtoLnClZ_4WqDPKIyLgyCJckf3IEaYuwD3-XYcKh_Ye78PhksZ7tCfuU0Eg3FIbZlZwX7YHqQBn7LMR0liKq26rYErWA1m_vwBkhIroVbwOIWmiM0uCLYlSfe4y0kHJqqASxEjlszHV9Eho7OyhaboxNHxwc2dOvW47xSExAIL1GJZa9RkTpMM-9IZnoBeopQcxgCOdxMISrhWbnqmLdEda8tRQoBwhl-MtDqybTU',
    rating: 4.8,
    reviewsCount: 310,
    description: 'Thick concentrate cleaner. Fully disinfects granite, hardwood, and glass with refreshing natural properties.',
    isOrganic: true
  },
  {
    id: 'h5',
    category: 'Household',
    name: 'Streak-Free Glass Spray',
    subtext: 'Crystal-clear designer botanical spray container next to windows.',
    price: 12.00,
    badge: 'Bestseller',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCm45wtJ8v7rBEnHuIaJav7eZ2C5J1TG5PKtxxhmK8eCVpXBeViID0GEPrlmbkn1FJgJny3dW2rMpCr1vnRlo8M_cRCcQHfrSWYsu7mEEykkTvaZMRKbTcM8hk35J8bxWTnRBwvDS6FAmyt6uz8gw5ZT3pWol87qqKwfYBbWLZW0xNuqvCzf75T4dNEVpyPbB1hINLx15kVe43A3EeCFBui19zrfZ5pRRvA3rFNWTnBxp4TCEaJZmy1rb6Rc3gOyAl4Kptw3nQKXSA',
    rating: 4.6,
    reviewsCount: 195,
    description: 'Antistatic plant-derived glass cleaner. Leaves surfaces completely pristine and clear without harsh chemical fumes.',
    isOrganic: true
  }
];

export const DUMMY_CART_INITIAL = [
  {
    id: 'g2',
    product: PRODUCTS.find(p => p.id === 'g2') || PRODUCTS[1],
    quantity: 2
  },
  {
    id: 'g5',
    product: PRODUCTS.find(p => p.id === 'g5') || PRODUCTS[4],
    quantity: 1
  }
];

export const MOCK_USERS_INITIAL: UserRecord[] = [
  {
    id: 'u1',
    name: 'Sarah Miller',
    email: 'sarah.m@example.com',
    role: 'user',
    avatarInitials: 'SM',
    orderDate: 'Jun 21, 2026',
    amount: 234.50,
    status: 'Paid'
  },
  {
    id: 'u2',
    name: 'James Rodriguez',
    email: 'james.rod@testmail.com',
    role: 'user',
    avatarInitials: 'JR',
    orderDate: 'Jun 19, 2026',
    amount: 12.00,
    status: 'Pending'
  },
  {
    id: 'u3',
    name: 'Emma Hudson',
    email: 'emma.h@organic.com',
    role: 'user',
    avatarInitials: 'EH',
    orderDate: 'Jun 18, 2026',
    amount: 45.99,
    status: 'Paid'
  }
];
