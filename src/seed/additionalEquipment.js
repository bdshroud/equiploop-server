/**
 * Additional EquipLoop equipment catalog products.
 *
 * Follows the strict Equipment schema used across the platform
 * (same shape as the entries in seedData.js / seedAllEquipment.js).
 * Realistic contractor/commercial brands are used throughout.
 */
export const ADDITIONAL_EQUIPMENT = [
  {
    title: "Caterpillar 331-XT Power Excavator",
    equipmentName: "Caterpillar 331-XT Power Excavator",
    category: "Heavy Machinery",
    rentalType: "Daily",
    rentalPrice: 1500,
    pricePerDay: 1500,
    availableQuantity: 2,
    securityDeposit: 2000,
    condition: "Excellent",
    brand: "Caterpillar",
    model: "331-XT",
    rentalTerms: "Certified heavy equipment operator required. Lowboy trailer transport arranged by client. Refundable damage deposit applies.",
    description: "High-power mining-style excavator engineered for deep cut and large volume removal in urban and quarry applications. Features a 26-ton operating weight, high-flow auxiliary hydraulics, and a robust 3.1 m³ bucket. Ideal for road widening, foundation work, and quarrying operations.",
    images: [
      "https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580983218765-f663bec07b37?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Caterpillar",
      Model: "331-XT",
      "Operating Weight": "16,000 kg (35,274 lbs)",
      Engine: "Caterpillar C7.1 Turbo Diesel (800 kW)",
      "Max Dig Depth": "18.3 m (60 ft)",
      "Bucket Capacity": "3.1 m³ (4.05 yd³)",
      Fuel: "Diesel (45 gal tank)"
    },
    location: {
      city: "Austin",
      state: "TX",
      address: "5250 Industrial Blvd"
    },
    availability: true,
    ownerId: "6b02c021880b5bac050c0862",
    ownerName: "Mohammad Yasin",
    ownerEmail: "yasinmunna46@gmail.com",
    status: "Approved",
    isFeatured: true,
    rating: 4.9,
    totalReviews: 12,
    totalBookings: 26,
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: "Bobcat 824RT 4WD Skid Steer Loader",
    equipmentName: "Bobcat 824RT 4WD Skid Steer Loader",
    category: "Heavy Machinery",
    rentalType: "Daily",
    rentalPrice: 290,
    pricePerDay: 290,
    availableQuantity: 2,
    securityDeposit: 400,
    condition: "Excellent",
    brand: "Bobcat",
    model: "824RT",
    rentalTerms: "Operator certification required. Return with a clean diesel tank and no unapproved attachments.",
    description: "Heavy-duty 4WD skid-steer loader built for contract work in tight sites and muddy conditions. Features a 14,000 lb rated operating capacity, two-range travel, and an enclosed heated cab for year-round utility.",
    images: [
      "https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Bobcat",
      Model: "824RT",
      "Rated Operating Capacity": "1,600 kg (3,500 lbs)",
      "Operating Weight": "2,540 kg (5,595 lbs)",
      Engine: "Bobcat 606 Turbo Diesel",
      Transmission: "Hydrostatic Two-Range"
    },
    location: {
      city: "San Antonio",
      state: "TX",
      address: "4100 Quarry Operations Rd"
    },
    availability: true,
    ownerId: "owner_seed_2",
    ownerName: "Northstar Plant Rentals",
    ownerEmail: "dispatch@northstarrentals.com",
    status: "Approved",
    isFeatured: false,
    rating: 4.8,
    totalReviews: 10,
    totalBookings: 18,
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: "Wacker Neuson SY 20 S Self-Propelled Trencher",
    equipmentName: "Wacker Neuson SY 20 S Self-Propelled Trencher",
    category: "Heavy Machinery",
    rentalType: "Daily",
    rentalPrice: 380,
    pricePerDay: 380,
    availableQuantity: 2,
    securityDeposit: 500,
    condition: "Excellent",
    brand: "Wacker Neuson",
    model: "SY 20 S",
    rentalTerms: "Operator must hold a valid heavy equipment license. Begin digging only on clear ground. Dig depths limited to 12 m per shift.",
    description: "Compact self-propelled trencher engineered for utility service and drainage projects. Features a reliable Honda GX390 engine, 200 mm cutting chain, and a 3-phase drive system for smooth soil penetration.",
    images: [
      "https://images.unsplash.com/photo-159003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Wacker Neuson",
      Model: "SY 20 S",
      Engine: "Honda GX390 15 HP",
      "Cut Width": "200 mm (7.9 in)",
      "Max Dig Depth": "12 m (39 ft)",
      Power: "300 hp"
    },
    location: {
      city: "Laredo",
      state: "TX",
      address: "900 Sediment Way"
    },
    availability: true,
    ownerId: "owner_seed_1",
    ownerName: "Apex Heavy Fleet LLC",
    ownerEmail: "rentals@apexmachinery.com",
    status: "Approved",
    isFeatured: false,
    rating: 4.9,
    totalReviews: 9,
    totalBookings: 20,
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: "Crown RC9030 Sit-Down Forklift 3,600 kg",
    equipmentName: "Crown RC9030 Sit-Down Forklift 3,600 kg",
    category: "Material Handling",
    rentalType: "Daily",
    rentalPrice: 680,
    pricePerDay: 680,
    availableQuantity: 2,
    securityDeposit: 800,
    condition: "Excellent",
    brand: "Crown Equipment",
    model: "RC9030",
    rentalTerms: "Forklift operator certification required. Charge battery after each shift and follow load chart limits at all heights.",
    description: "Sit-down high-visibility forklift built for warehouse and dock operations, featuring a 3600 kg (7,937 lbs) rated capacity, 3,505 mm lift height, and a Pneumatic 18-inch tire system. Includes automatic slowdown brake.",
    images: [
      "https://images.unsplash.com/photo-159003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Crown Equipment",
      Model: "RC9030",
      "Rated Capacity": "3,600 kg (7,937 lbs)",
      Height: "3,050 mm (120 in)",
      "Lift Height": "3,505 mm (138 in)",
      Tires: "Pneumatic 18 in",
      Transmission: "Hydrostatic"
    },
    location: {
      city: "Dallas",
      state: "TX",
      address: "220 Industrial Way"
    },
    availability: true,
    ownerId: "owner_seed_2",
    ownerName: "Northstar Plant Rentals",
    ownerEmail: "dispatch@northstarrentals.com",
    status: "Approved",
    isFeatured: false,
    rating: 4.9,
    totalReviews: 8,
    totalBookings: 16,
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: "Kubota M7044DFDT4 4WD Compact Utility Tractor",
    equipmentName: "Kubota M7044DFDT4 4WD Compact Utility Tractor",
    category: "Agriculture Equipment",
    rentalType: "Daily",
    rentalPrice: 310,
    pricePerDay: 310,
    availableQuantity: 2,
    securityDeposit: 350,
    condition: "Excellent",
    brand: "Kubota",
    model: "M7044DFDT4",
    rentalTerms: "Operate at designated PTO speeds. Wash undercarriage after soil cultivation.",
    description: "Premium 4WD compact utility tractor with a 4-speed turbo diesel engine and a Category 1 three-point hitch. Suited for loader work, hauling, and trenching on smaller lots and orchards.",
    images: [
      "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Kubota",
      Model: "M7044DFDT4",
      Engine: "Kubota 1.4L 4-Cylinder Turbo Diesel",
      "Net Power": "57.4 hp (42.8 kW)",
      Drive: "4WD",
      "Hitch": "Category 1 Three-Point Hitch",
      "Lift Capacity": "1,036 kg (2,285 lbs)"
    },
    location: {
      city: "Temple",
      state: "TX",
      address: "1800 Agronomy Rd"
    },
    availability: true,
    ownerId: "owner_seed_1",
    ownerName: "Apex Heavy Fleet LLC",
    ownerEmail: "rentals@apexmachinery.com",
    status: "Approved",
    isFeatured: false,
    rating: 4.8,
    totalReviews: 9,
    totalBookings: 22,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: "Kawasaki Mule 4010Xi MFWD Compact Utility Vehicle",
    equipmentName: "Kawasaki Mule 4010Xi MFWD Compact Utility Vehicle",
    category: "Vehicles & Transportation",
    rentalType: "Daily",
    rentalPrice: 395,
    pricePerDay: 395,
    availableQuantity: 2,
    securityDeposit: 450,
    condition: "Excellent",
    brand: "Kawasaki",
    model: "Mule 4010Xi",
    rentalTerms: "Responsible adult operator must accompany all riders. Operates on golf cart facilities. Charge after each shift.",
    description: "Versatile 4x4 compact utility vehicle with a four-speed automatic transmission and a rear cargo bed. Excellent for golf course operations, property maintenance, and landscape crews carrying tools to remote sites.",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Kawasaki",
      Model: "Mule 4010Xi",
      Engine: "15.2L 4-Cylinder In-Line Gas Engine (200 hp)",
      Drivetrain: "MFWD",
      Seating: "2-3 passengers",
      "Lift Height": "0.3 m (1 ft)"
    },
    location: {
      city: "San Antonio",
      state: "TX",
      address: "1902 Timberland Rd"
    },
    availability: true,
    ownerId: "owner_seed_2",
    ownerName: "Northstar Plant Rentals",
    ownerEmail: "dispatch@northstarrentals.com",
    status: "Approved",
    isFeatured: false,
    rating: 4.8,
    totalReviews: 11,
    totalBookings: 19,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: "DJI Inspire 3 FPV Drone Kit",
    equipmentName: "DJI Inspire 3 FPV Drone Kit",
    category: "Photography Equipment",
    rentalType: "Daily",
    rentalPrice: 290,
    pricePerDay: 290,
    availableQuantity: 3,
    securityDeposit: 300,
    condition: "Excellent",
    brand: "DJI",
    model: "Inspire 3",
    rentalTerms: "Operator must be a FAA-registered pilot for flying; certificate of insurance required for site access. Return in hard case.",
    description: "Compact FPV drone with 10 km video transmission range, 20 min hover, and high-speed flight capability. Excellent for event coverage, FPV cinema, and real-time aerial monitoring. Includes 2 batteries, charger, and 2 radio links.",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "DJI",
      Model: "Inspire 3",
      "Hover Time": "20 min",
      "Video Transmission": "10 km bidirectional",
      "Camera": "5760 x 4320 (24.5 MP) photo, 4K60 video",
      FlightController: "Dual IMU, Dual ESC"
    },
    location: {
      city: "Houston",
      state: "TX",
      address: "1200 Skyline Way"
    },
    availability: true,
    ownerId: "owner_seed_3",
    ownerName: "CineVault Camera Gear",
    ownerEmail: "gear@cinevault.com",
    status: "Approved",
    isFeatured: false,
    rating: 5.0,
    totalReviews: 10,
    totalBookings: 14,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: "Fluke 87V True RMS Digital Multimeter",
    equipmentName: "Fluke 87V True RMS Digital Multimeter",
    category: "Electronics",
    rentalType: "Daily",
    rentalPrice: 55,
    pricePerDay: 55,
    availableQuantity: 6,
    securityDeposit: 80,
    condition: "Excellent",
    brand: "Fluke",
    model: "87V",
    rentalTerms: "Calibrated unit. Return with the original case and all leads.",
    description: "Industrial-grade true RMS multimeter with automatic measurement and test resistance capabilities. Essential test tool for electrical troubleshooting, voltage checks, and continuity verification in the field.",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Fluke",
      Model: "87V",
      "True RMS Catalog": "300,000",
      "Diode Test": "Yes",
      Storage: "Inside case with all leads and probes"
    },
    location: {
      city: "Dallas",
      state: "TX",
      address: "450 Logistics Pkwy"
    },
    availability: true,
    ownerId: "owner_seed_2",
    ownerName: "Northstar Plant Rentals",
    ownerEmail: "dispatch@northstarrentals.com",
    status: "Approved",
    isFeatured: false,
    rating: 4.9,
    totalReviews: 12,
    totalBookings: 25,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: "Tektronix MSO64B 4-Channel 64MHz Digital Oscilloscope",
    equipmentName: "Tektronix MSO64B 4-Channel 64MHz Digital Oscilloscope",
    category: "Electronics",
    rentalType: "Daily",
    rentalPrice: 210,
    pricePerDay: 210,
    availableQuantity: 2,
    securityDeposit: 250,
    condition: "Excellent",
    brand: "Tektronix",
    model: "MSO64B",
    rentalTerms: "Delivered in protective case. Calibrated probes included. Lab and field use only.",
    description: "Budget-friendly MSO64B 4-channel, 64 MHz digital oscilloscope ideal for industrial controls and power supply diagnostics. Includes logic analyzer channel and Math functions.",
    images: [
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Tektronix",
      Model: "MSO64B",
      Channels: "4 Analog + 2 Logic",
      Bandwidth: "64 MHz",
      "Sample Rate": "750 MS/s",
      Storage: "4 Mpts"
    },
    location: {
      city: "Plano",
      state: "TX",
      address: "6800 Silicon Corridor"
    },
    availability: true,
    ownerId: "6b02c021880b5bac050c0862",
    ownerName: "Mohammad Yasin",
    ownerEmail: "yasinmunna46@gmail.com",
    status: "Approved",
    isFeatured: false,
    rating: 4.9,
    totalReviews: 8,
    totalBookings: 12,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: "DeWalt DWD112XACK 14\" Sliding Compound Miter Saw",
    equipmentName: "DeWalt DWD112XACK 14\" Sliding Compound Miter Saw",
    category: "Power Tools",
    rentalType: "Daily",
    rentalPrice: 65,
    pricePerDay: 65,
    availableQuantity: 4,
    securityDeposit: 100,
    condition: "Excellent",
    brand: "DeWalt",
    model: "DWD112XACK",
    rentalTerms: "Clean blade with dust extraction port covered. Use with proper eye and ear protection.",
    description: "15-inch sliding compound miter saw with a 16-inch max rip cut and 2,000 RPM blade speed. Features a fold-down extension table and integrated blade guard for safe operation on job-site projects.",
    images: [
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "DeWalt",
      Model: "DWD112XACK",
      "Blade Size": "14 inch (355 mm)",
      "Max Rip Cut": "16 inch (406 mm)",
      Speed: "1,780 RPM (zero load)",
      "Extension Table": "Two-sided removable extension"
    },
    location: {
      city: "Dallas",
      state: "TX",
      address: "1405 Woodcraft Way"
    },
    availability: true,
    ownerId: "owner_seed_1",
    ownerName: "Apex Heavy Fleet LLC",
    ownerEmail: "rentals@apexmachinery.com",
    status: "Approved",
    isFeatured: false,
    rating: 4.8,
    totalReviews: 10,
    totalBookings: 18,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: "Generac iQ2000 Inverter Generator",
    equipmentName: "Generac iQ2000 Inverter Generator",
    category: "Generators & Power",
    rentalType: "Daily",
    rentalPrice: 55,
    pricePerDay: 55,
    availableQuantity: 5,
    securityDeposit: 80,
    condition: "Excellent",
    brand: "Generac",
    model: "iQ2000",
    rentalTerms: "Unleaded gasoline only. Operate strictly in well-ventilated outdoor environments. Wrap in breathable material during transit.",
    description: "High-output iQ2000 inverter generator delivering clean, stable power for sensitive electronics and refrigeration units. Quiet operation (39 dBA) makes it ideal for campgrounds, campervans, and outdoor movie nights.",
    images: [
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Generac",
      Model: "iQ2000",
      "Rated Output": "2,000 Watts",
      "Peak Output": "2,600 Watts",
      Fuel: "Gasoline",
      "Noise Level": "39 dBA at 23 feet",
      FuelCapacity: "3.5 gal tank"
    },
    location: {
      city: "Temple",
      state: "TX",
      address: "900 Sediment Way"
    },
    availability: true,
    ownerId: "owner_seed_2",
    ownerName: "Northstar Plant Rentals",
    ownerEmail: "dispatch@northstarrentals.com",
    status: "Approved",
    isFeatured: false,
    rating: 4.8,
    totalReviews: 9,
    totalBookings: 20,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    title: "Pioneer DJ DJM-250MK3 2-Channel DJ Controller",
    equipmentName: "Pioneer DJ DJM-250MK3 2-Channel DJ Controller",
    category: "Event Equipment",
    rentalType: "Daily",
    rentalPrice: 85,
    pricePerDay: 85,
    availableQuantity: 3,
    securityDeposit: 100,
    condition: "Brand New",
    brand: "Pioneer DJ",
    model: "DJM-250MK3",
    rentalTerms: "Includes two XDJ-XZ controller decks in the bundle. Transport in padded case. Certification of event insurance required for public venues.",
    description: "Professional 2-channel DJ controller for the Serato DJ Lite 2 software, featuring two jog wheels, touch strips, hot cue buttons, and a built-in audio interface. Ideal for weddings, corporate events, and private parties.",
    images: [
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Pioneer DJ",
      Model: "DJM-250MK3",
      "Jog Wheels": "Two encoder jog wheels with pressure-sensitive wheels",
      "Software": "Serato DJ Lite 2 (bundled)",
      "Touch Strips": "Two per deck",
      Faders: "2 per deck"
    },
    location: {
      city: "Austin",
      state: "TX",
      address: "310 East 6th Street"
    },
    availability: true,
    ownerId: "owner_seed_3",
    ownerName: "CineVault Camera Gear",
    ownerEmail: "gear@cinevault.com",
    status: "Approved",
    isFeatured: false,
    rating: 4.7,
    totalReviews: 8,
    totalBookings: 15,
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    updatedAt: new Date().toISOString()
  }
];
