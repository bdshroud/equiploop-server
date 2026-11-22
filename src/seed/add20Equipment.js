import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.DB_URI;
const dbName = process.env.DB_NAME || "equiploop";

if (!uri) {
  console.error("Missing DB_URI in environment!");
  process.exit(1);
}

export const NEW_20_EQUIPMENT = [
  {
    title: "Bobcat S650 Skid-Steer Loader with Hydraulic Grapple",
    equipmentName: "Bobcat S650 Skid-Steer Loader with Hydraulic Grapple",
    category: "Construction Equipment",
    rentalType: "Daily",
    rentalPrice: 240,
    pricePerDay: 240,
    availableQuantity: 3,
    securityDeposit: 400,
    condition: "Excellent",
    brand: "Bobcat",
    model: "S650",
    rentalTerms: "Operator must be certified. Return cleaned with a full diesel tank. Standard insurance waiver applies.",
    description: "Versatile vertical-lift-path skid-steer loader designed for high lifting and heavy digging. Equipped with two-speed travel, enclosed heated/AC cab, hydraulic grapple attachment, and high-flow auxiliary hydraulics.",
    images: [
      "https://images.unsplash.com/photo-1579847188804-ecba0e2ea330?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Bobcat",
      Model: "S650",
      "Rated Operating Capacity": "1,220 kg (2,690 lbs)",
      "Operating Weight": "3,770 kg (8,300 lbs)",
      "Engine Power": "55.4 kW (74 hp)",
      "Fuel Type": "Diesel"
    },
    location: {
      city: "Austin",
      state: "TX",
      address: "2100 East Airport Blvd"
    },
    availability: true,
    ownerId: "6b02c021880b5bac050c0862",
    ownerName: "Mohammad Yasin",
    ownerEmail: "yasinmunna46@gmail.com",
    status: "Approved",
    isFeatured: true,
    rating: 4.9,
    totalReviews: 8,
    totalBookings: 19,
    createdAt: new Date(Date.now() - 25 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "DeWalt DW735X 13-Inch Two-Speed Benchtop Thickness Planer",
    equipmentName: "DeWalt DW735X 13-Inch Two-Speed Benchtop Thickness Planer",
    category: "Construction Equipment",
    rentalType: "Daily",
    rentalPrice: 65,
    pricePerDay: 65,
    availableQuantity: 4,
    securityDeposit: 120,
    condition: "Brand New",
    brand: "DeWalt",
    model: "DW735X",
    rentalTerms: "Clean cutterhead after use. No nails or metal hardware in stock lumber.",
    description: "Heavy-duty three-knife cutterhead benchtop planer with two-speed gearbox for 96 or 179 cuts per inch. Includes infeed and outfeed tables and an extra set of reversible blades for fine woodworking.",
    images: [
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "DeWalt",
      Model: "DW735X",
      "Motor Power": "15 Amp (20,000 RPM)",
      "Max Depth of Cut": "1/8 in",
      "Max Planning Width": "13 in",
      "Dust Ejection": "Fan-assisted chip blower"
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
    totalReviews: 12,
    totalBookings: 24,
    createdAt: new Date(Date.now() - 22 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Canon EOS R5 C Cinema Camera 8K Raw Production Kit",
    equipmentName: "Canon EOS R5 C Cinema Camera 8K Raw Production Kit",
    category: "Photography Equipment",
    rentalType: "Daily",
    rentalPrice: 185,
    pricePerDay: 185,
    availableQuantity: 2,
    securityDeposit: 350,
    condition: "Excellent",
    brand: "Canon",
    model: "EOS R5 C",
    rentalTerms: "Must return in custom Pelican case with all CFexpress Type B media wiped.",
    description: "Hybrid cinema camera featuring internal 8K/60P Raw recording with continuous active cooling fan. Comes packaged with Canon RF 24-70mm f/2.8L IS USM lens, 2x 512GB cards, and dual battery charger.",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Canon",
      Sensor: "45MP Full-Frame CMOS",
      Resolution: "8K 60fps Cinema RAW Light",
      Autofocus: "Dual Pixel CMOS AF with Eye Detection",
      Cooling: "Built-in internal active fan"
    },
    location: {
      city: "Austin",
      state: "TX",
      address: "702 South Lamar Blvd"
    },
    availability: true,
    ownerId: "owner_seed_3",
    ownerName: "CineVault Camera Gear",
    ownerEmail: "gear@cinevault.com",
    status: "Approved",
    isFeatured: true,
    rating: 5.0,
    totalReviews: 10,
    totalBookings: 21,
    createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "RED KOMODO 6K Digital Cinema Production Package",
    equipmentName: "RED KOMODO 6K Digital Cinema Production Package",
    category: "Photography Equipment",
    rentalType: "Daily",
    rentalPrice: 320,
    pricePerDay: 320,
    availableQuantity: 2,
    securityDeposit: 600,
    condition: "Brand New",
    brand: "RED Digital Cinema",
    model: "KOMODO 6K",
    rentalTerms: "Proof of equipment insurance required. Hard case return mandatory.",
    description: "Ultra-compact 6K cinema camera featuring global shutter sensor, RF mount, and REDCODE RAW recording. Outfitted with SmallHD monitor, V-mount breakout battery plate, and top handle.",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "RED Digital Cinema",
      Sensor: "19.9 MP Super 35 Global Shutter CMOS",
      "Dynamic Range": "16+ stops",
      Media: "CFast 2.0 (512GB included)",
      Output: "12G-SDI 4K 60fps"
    },
    location: {
      city: "Houston",
      state: "TX",
      address: "3200 Film Row Suite 10"
    },
    availability: true,
    ownerId: "6b02c021880b5bac050c0862",
    ownerName: "Mohammad Yasin",
    ownerEmail: "yasinmunna46@gmail.com",
    status: "Approved",
    isFeatured: true,
    rating: 5.0,
    totalReviews: 7,
    totalBookings: 15,
    createdAt: new Date(Date.now() - 19 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Big Tex 14ET 20ft Heavy Duty Equipment Trailer",
    equipmentName: "Big Tex 14ET 20ft Heavy Duty Equipment Trailer",
    category: "Vehicles & Transportation",
    rentalType: "Daily",
    rentalPrice: 110,
    pricePerDay: 110,
    availableQuantity: 3,
    securityDeposit: 250,
    condition: "Good",
    brand: "Big Tex Trailers",
    model: "14ET-20",
    rentalTerms: "Towing vehicle must have electric brake controller and 2-5/16 ball hitch.",
    description: "Tandem axle equipment trailer with 14,000 lbs GVWR, fold-up spring assist stand-up ramps, tie-down stake pockets, and treated pine wood floor. Ideal for transporting skid steers and mini excavators.",
    images: [
      "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Big Tex",
      GVWR: "14,000 lbs",
      Payload: "10,950 lbs",
      Deck: "20 ft (16 flat + 4 dovetail)",
      Brakes: "Electric on both axles"
    },
    location: {
      city: "San Antonio",
      state: "TX",
      address: "950 Hauler Express Rd"
    },
    availability: true,
    ownerId: "owner_seed_1",
    ownerName: "Apex Heavy Fleet LLC",
    ownerEmail: "rentals@apexmachinery.com",
    status: "Approved",
    isFeatured: false,
    rating: 4.7,
    totalReviews: 9,
    totalBookings: 18,
    createdAt: new Date(Date.now() - 18 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Chevrolet Silverado 3500HD Dually Utility Service Truck",
    equipmentName: "Chevrolet Silverado 3500HD Dually Utility Service Truck",
    category: "Vehicles & Transportation",
    rentalType: "Daily",
    rentalPrice: 260,
    pricePerDay: 260,
    availableQuantity: 2,
    securityDeposit: 450,
    condition: "Excellent",
    brand: "Chevrolet",
    model: "Silverado 3500HD",
    rentalTerms: "Commercial driver license preferred. Mileage included: 150 miles/day ($0.45/mile overage).",
    description: "Rugged Duramax 6.6L V8 Turbo-Diesel utility service body truck with locking tool compartments, overhead ladder rack, heavy-duty tow receiver, and air compressor hookup.",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Chevrolet",
      Engine: "6.6L Duramax Turbo-Diesel V8",
      Transmission: "Allison 10-Speed Automatic",
      Towing: "20,000 lbs max conventional",
      Body: "Knapheide 8ft Steel Service Body"
    },
    location: {
      city: "Dallas",
      state: "TX",
      address: "510 Commercial Fleet Way"
    },
    availability: true,
    ownerId: "owner_seed_2",
    ownerName: "Northstar Plant Rentals",
    ownerEmail: "dispatch@northstarrentals.com",
    status: "Approved",
    isFeatured: true,
    rating: 4.9,
    totalReviews: 14,
    totalBookings: 29,
    createdAt: new Date(Date.now() - 17 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "John Deere 3038E Compact Utility Tractor with Front Loader",
    equipmentName: "John Deere 3038E Compact Utility Tractor with Front Loader",
    category: "Agriculture Equipment",
    rentalType: "Daily",
    rentalPrice: 225,
    pricePerDay: 225,
    availableQuantity: 3,
    securityDeposit: 400,
    condition: "Excellent",
    brand: "John Deere",
    model: "3038E",
    rentalTerms: "Agricultural use only. Daily maintenance checks required (oil and coolant). Clean radiator screen.",
    description: "Standard 4WD compact utility tractor featuring 37.3 hp turbocharged diesel engine and hydrostatic transmission with twin touch foot pedals. Comes standard with John Deere 300E front end loader.",
    images: [
      "https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "John Deere",
      Power: "37.3 hp (27.8 kW)",
      Drive: "Mechanical Front Wheel Drive (MFWD)",
      Hitch: "Category 1 Three-Point Hitch",
      Transmission: "Hydrostatic - 2 Range"
    },
    location: {
      city: "Waco",
      state: "TX",
      address: "420 Prairie Meadow Ln"
    },
    availability: true,
    ownerId: "6b02c021880b5bac050c0862",
    ownerName: "Mohammad Yasin",
    ownerEmail: "yasinmunna46@gmail.com",
    status: "Approved",
    isFeatured: true,
    rating: 5.0,
    totalReviews: 11,
    totalBookings: 23,
    createdAt: new Date(Date.now() - 16 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Kubota L3901 4WD Diesel Tractor with Heavy Duty Rotary Tiller",
    equipmentName: "Kubota L3901 4WD Diesel Tractor with Heavy Duty Rotary Tiller",
    category: "Agriculture Equipment",
    rentalType: "Daily",
    rentalPrice: 210,
    pricePerDay: 210,
    availableQuantity: 2,
    securityDeposit: 380,
    condition: "Good",
    brand: "Kubota",
    model: "L3901DT",
    rentalTerms: "Operate at designated PTO speeds. Wash undercarriage after soil cultivation.",
    description: "Reliable 37.5 hp diesel tractor engineered with bevel gear front axle for tight turn radius and smooth power transfer. Mounted with a Land Pride 60-inch heavy duty reverse-rotation rotary tiller.",
    images: [
      "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Kubota",
      Engine: "Kubota 1.8L 3-Cylinder Diesel",
      PTO: "32.1 hp live-independent",
      Attachment: "Land Pride RTR1260 60in Rotary Tiller",
      Fuel: "Diesel (11.1 gal capacity)"
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
    totalReviews: 8,
    totalBookings: 17,
    createdAt: new Date(Date.now() - 15 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "FLIR T540 Professional Thermal Imaging Infrared Camera",
    equipmentName: "FLIR T540 Professional Thermal Imaging Infrared Camera",
    category: "Electronics",
    rentalType: "Daily",
    rentalPrice: 175,
    pricePerDay: 175,
    availableQuantity: 3,
    securityDeposit: 300,
    condition: "Brand New",
    brand: "FLIR Systems",
    model: "T540",
    rentalTerms: "Calibrated unit. Handle with care in protective field bag. Do not point at open sun.",
    description: "Professional handheld thermography camera with 464 x 348 true IR resolution and 180-degree rotating optical block. Features laser-assisted autofocus and MSX image enhancement for electrical inspections.",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "FLIR",
      Resolution: "464 x 348 (161,472 pixels)",
      "Thermal Sensitivity": "<30 mK at 30°C",
      "Temperature Range": "-20°C to 1500°C (-4°F to 2732°F)",
      Display: "4-inch 640x480 touchscreen LCD"
    },
    location: {
      city: "Austin",
      state: "TX",
      address: "1050 Tech Ridge Center"
    },
    availability: true,
    ownerId: "owner_seed_3",
    ownerName: "CineVault Camera Gear",
    ownerEmail: "gear@cinevault.com",
    status: "Approved",
    isFeatured: false,
    rating: 4.9,
    totalReviews: 13,
    totalBookings: 25,
    createdAt: new Date(Date.now() - 14 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Keysight InfiniVision 4-Channel 1GHz Digital Oscilloscope",
    equipmentName: "Keysight InfiniVision 4-Channel 1GHz Digital Oscilloscope",
    category: "Electronics",
    rentalType: "Daily",
    rentalPrice: 140,
    pricePerDay: 140,
    availableQuantity: 2,
    securityDeposit: 250,
    condition: "Excellent",
    brand: "Keysight",
    model: "DSOX3014T",
    rentalTerms: "Laboratory and field test use only. Calibrated probes included in hard carrying case.",
    description: "High-speed 4-channel mixed-signal oscilloscope with 1,000,000 waveforms/sec update rate and 8.5-inch capacitive touch screen. Includes Zone touch triggering and automated protocol decoding.",
    images: [
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Keysight",
      Bandwidth: "1 GHz",
      Channels: "4 Analog Channels",
      "Sample Rate": "Up to 5 GSa/s",
      Memory: "4 Mpts standard"
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
    rating: 4.8,
    totalReviews: 6,
    totalBookings: 12,
    createdAt: new Date(Date.now() - 13 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "JBL VRX932LAP Powered Line Array Sound System with Dual Subwoofers",
    equipmentName: "JBL VRX932LAP Powered Line Array Sound System with Dual Subwoofers",
    category: "Event Equipment",
    rentalType: "Daily",
    rentalPrice: 380,
    pricePerDay: 380,
    availableQuantity: 2,
    securityDeposit: 500,
    condition: "Excellent",
    brand: "JBL Professional",
    model: "VRX932LAP & VRX918SP",
    rentalTerms: "Indoor or weather-protected outdoor use only. Heavy gauge PowerCON cables included.",
    description: "Concert-grade active line array sound package featuring four VRX932LAP 12-inch two-way powered tops and two VRX918SP 18-inch powered subwoofers with integrated Crown D-Class amplification.",
    images: [
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "JBL Professional",
      "Power Rating": "1750W Peak per cabinet",
      Coverage: "100° x 15° nominal dispersion",
      "Max SPL": "136 dB peak SPL",
      DSP: "Integrated Crown DriveCore processing"
    },
    location: {
      city: "Austin",
      state: "TX",
      address: "310 East 6th Street"
    },
    availability: true,
    ownerId: "owner_seed_2",
    ownerName: "Northstar Plant Rentals",
    ownerEmail: "dispatch@northstarrentals.com",
    status: "Approved",
    isFeatured: true,
    rating: 5.0,
    totalReviews: 16,
    totalBookings: 31,
    createdAt: new Date(Date.now() - 12 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Chauvet Pro Rogue R2X Wash Moving Head Stage Light Package",
    equipmentName: "Chauvet Pro Rogue R2X Wash Moving Head Stage Light Package",
    category: "Event Equipment",
    rentalType: "Daily",
    rentalPrice: 160,
    pricePerDay: 160,
    availableQuantity: 4,
    securityDeposit: 250,
    condition: "Brand New",
    brand: "Chauvet Professional",
    model: "Rogue R2X Wash",
    rentalTerms: "Includes dual road case, safety cables, and Omega brackets. DMX 5-pin cables provided.",
    description: "High-output RGBW LED moving head wash light with 19 x 25W quad-color LEDs. Features smooth 12° to 49° motorized zoom, individual zone control, and 16-bit dimming for festival productions.",
    images: [
      "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Chauvet Pro",
      "Light Source": "19 LEDs (quad-color RGBW) 25 W",
      Zoom: "12° to 49° motorized",
      "Illuminance (12°)": "8,650 lux at 5m",
      Control: "DMX-512, RDM compatible"
    },
    location: {
      city: "Dallas",
      state: "TX",
      address: "1900 Market Center Blvd"
    },
    availability: true,
    ownerId: "owner_seed_3",
    ownerName: "CineVault Camera Gear",
    ownerEmail: "gear@cinevault.com",
    status: "Approved",
    isFeatured: false,
    rating: 4.9,
    totalReviews: 9,
    totalBookings: 19,
    createdAt: new Date(Date.now() - 11 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Hilti TE 3000-AVR Heavy-Duty Concrete Demolition Breaker",
    equipmentName: "Hilti TE 3000-AVR Heavy-Duty Concrete Demolition Breaker",
    category: "Power Tools",
    rentalType: "Daily",
    rentalPrice: 95,
    pricePerDay: 95,
    availableQuantity: 5,
    securityDeposit: 180,
    condition: "Excellent",
    brand: "Hilti",
    model: "TE 3000-AVR",
    rentalTerms: "Eye and ear protection required. Return with both pointed and flat chisels cleaned.",
    description: "Massive 68 joule impact energy electric jackhammer engineered for breaking reinforced concrete slabs, foundations, and asphalt without the bulk of a towable pneumatic compressor.",
    images: [
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Hilti",
      "Single Impact Energy": "68 J",
      "Full Hammering Frequency": "860 impacts/minute",
      Weight: "29.9 kg (65.9 lbs)",
      Vibration: "7 m/s² (Active Vibration Reduction)"
    },
    location: {
      city: "Fort Worth",
      state: "TX",
      address: "710 Industrial Park Dr"
    },
    availability: true,
    ownerId: "6b02c021880b5bac050c0862",
    ownerName: "Mohammad Yasin",
    ownerEmail: "yasinmunna46@gmail.com",
    status: "Approved",
    isFeatured: true,
    rating: 4.9,
    totalReviews: 15,
    totalBookings: 33,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Milwaukee M18 FUEL Cordless Diamond Core Drill Rig Kit",
    equipmentName: "Milwaukee M18 FUEL Cordless Diamond Core Drill Rig Kit",
    category: "Power Tools",
    rentalType: "Daily",
    rentalPrice: 115,
    pricePerDay: 115,
    availableQuantity: 3,
    securityDeposit: 200,
    condition: "Brand New",
    brand: "Milwaukee Tool",
    model: "MXF301-2CP",
    rentalTerms: "Water source required for wet coring. Do not exceed 6-inch diameter bit ratings.",
    description: "Industry-first battery-powered handheld and stand core drill. Delivers maximum productivity for plumber and electrician pass-through penetrations in reinforced concrete and brick masonry.",
    images: [
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Milwaukee",
      Capacity: "Up to 6-inch holes in concrete",
      Speeds: "2-Speed: 790 / 1550 RPM",
      Power: "MX FUEL Lithium-Ion Battery System",
      Safety: "AUTOSTOP clutch protection"
    },
    location: {
      city: "Houston",
      state: "TX",
      address: "1120 Builders Way"
    },
    availability: true,
    ownerId: "owner_seed_1",
    ownerName: "Apex Heavy Fleet LLC",
    ownerEmail: "rentals@apexmachinery.com",
    status: "Approved",
    isFeatured: false,
    rating: 4.8,
    totalReviews: 7,
    totalBookings: 14,
    createdAt: new Date(Date.now() - 9 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Komatsu PC138US-11 Short Tail Swing Hydraulic Excavator",
    equipmentName: "Komatsu PC138US-11 Short Tail Swing Hydraulic Excavator",
    category: "Heavy Machinery",
    rentalType: "Daily",
    rentalPrice: 480,
    pricePerDay: 480,
    availableQuantity: 2,
    securityDeposit: 800,
    condition: "Excellent",
    brand: "Komatsu",
    model: "PC138US-11",
    rentalTerms: "Lowboy trailer transport required. Certified heavy equipment operators only.",
    description: "Tight-tail-swing radius excavator optimized for road work, bridges, and urban utility installations. High stability design delivers lifting capacity equivalent to standard conventional excavators.",
    images: [
      "https://images.unsplash.com/photo-1580983218765-f663bec07b37?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Komatsu",
      "Operating Weight": "14,800 kg (32,628 lbs)",
      Engine: "Komatsu SAA4D95LE-7 97.2 hp",
      "Max Dig Depth": "5.48 m (18 ft)",
      Bucket: "0.65 m³ heavy duty trenching bucket"
    },
    location: {
      city: "San Antonio",
      state: "TX",
      address: "4100 Quarry Operations Rd"
    },
    availability: true,
    ownerId: "owner_seed_1",
    ownerName: "Apex Heavy Fleet LLC",
    ownerEmail: "rentals@apexmachinery.com",
    status: "Approved",
    isFeatured: true,
    rating: 5.0,
    totalReviews: 12,
    totalBookings: 22,
    createdAt: new Date(Date.now() - 8 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "CASE 580 Super N 4WD Backhoe Loader with Extendahoe",
    equipmentName: "CASE 580 Super N 4WD Backhoe Loader with Extendahoe",
    category: "Heavy Machinery",
    rentalType: "Daily",
    rentalPrice: 390,
    pricePerDay: 390,
    availableQuantity: 2,
    securityDeposit: 650,
    condition: "Good",
    brand: "CASE Construction",
    model: "580 Super N",
    rentalTerms: "Daily maintenance logs required. Return with clean stabilizers and bucket.",
    description: "Versatile commercial backhoe loader with Powershift transmission, ProControl anti-rebound swing system, 4-in-1 multi-purpose front loader bucket, and Extendahoe extending dipper arm.",
    images: [
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "CASE",
      "Net Engine Power": "97 hp (72 kW)",
      "Max Dig Depth": "4.42 m standard / 5.59 m extended",
      Loader: "1.25 cu yd 4-in-1 bucket with flip-over forks",
      Transmission: "Auto-Shift 4-Speed 4WD"
    },
    location: {
      city: "Austin",
      state: "TX",
      address: "8800 Highway 290 West"
    },
    availability: true,
    ownerId: "owner_seed_2",
    ownerName: "Northstar Plant Rentals",
    ownerEmail: "dispatch@northstarrentals.com",
    status: "Approved",
    isFeatured: false,
    rating: 4.7,
    totalReviews: 10,
    totalBookings: 20,
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Toyota 8FGU25 5000 lb Pneumatic Tire Warehouse Forklift",
    equipmentName: "Toyota 8FGU25 5000 lb Pneumatic Tire Warehouse Forklift",
    category: "Material Handling",
    rentalType: "Daily",
    rentalPrice: 190,
    pricePerDay: 190,
    availableQuantity: 3,
    securityDeposit: 350,
    condition: "Excellent",
    brand: "Toyota Material Handling",
    model: "8FGU25",
    rentalTerms: "OSHA certified forklift operator only. Standard propane cylinder included.",
    description: "Leading dual-fuel (LP/Gas) pneumatic tire forklift featuring Toyota's System of Active Stability (SAS), 3-stage mast with full free lift, side-shifting carriage, and 48-inch pallet forks.",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Toyota",
      "Lift Capacity": "5,000 lbs at 24-in load center",
      "Max Lift Height": "189 in (3-stage mast)",
      Power: "Toyota 4Y-ECS Industrial Engine",
      Tires: "Solid Pneumatic (indoor/outdoor)"
    },
    location: {
      city: "Dallas",
      state: "TX",
      address: "2400 Distribution Center Pkwy"
    },
    availability: true,
    ownerId: "6b02c021880b5bac050c0862",
    ownerName: "Mohammad Yasin",
    ownerEmail: "yasinmunna46@gmail.com",
    status: "Approved",
    isFeatured: true,
    rating: 4.9,
    totalReviews: 18,
    totalBookings: 35,
    createdAt: new Date(Date.now() - 6 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Genie GTH-844 Telehandler 8000 lb High Reach Forklift",
    equipmentName: "Genie GTH-844 Telehandler 8000 lb High Reach Forklift",
    category: "Material Handling",
    rentalType: "Daily",
    rentalPrice: 340,
    pricePerDay: 340,
    availableQuantity: 2,
    securityDeposit: 550,
    condition: "Good",
    brand: "Genie",
    model: "GTH-844",
    rentalTerms: "Trained telehandler operator certification required. Return with full fuel tank.",
    description: "Rugged rough terrain telehandler delivering 8,000 lbs lifting capacity and 44 ft max forward reach. Features 3-mode steering (front, crab, coordinated) and ergonomic cab with proportional joystick control.",
    images: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Genie",
      "Max Lifting Capacity": "8,000 lbs (3,629 kg)",
      "Max Lift Height": "43 ft 10 in (13.36 m)",
      "Max Forward Reach": "28 ft 2 in",
      Engine: "Deutz 74 hp Tier 4 Final Diesel"
    },
    location: {
      city: "Houston",
      state: "TX",
      address: "7700 Port Terminal Blvd"
    },
    availability: true,
    ownerId: "owner_seed_1",
    ownerName: "Apex Heavy Fleet LLC",
    ownerEmail: "rentals@apexmachinery.com",
    status: "Approved",
    isFeatured: false,
    rating: 4.8,
    totalReviews: 11,
    totalBookings: 21,
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Generac Mobile MMG45D Tier 4 Diesel Towable Generator 45kVA",
    equipmentName: "Generac Mobile MMG45D Tier 4 Diesel Towable Generator 45kVA",
    category: "Generators & Power",
    rentalType: "Daily",
    rentalPrice: 220,
    pricePerDay: 220,
    availableQuantity: 3,
    securityDeposit: 400,
    condition: "Excellent",
    brand: "Generac Mobile",
    model: "MMG45D",
    rentalTerms: "Ultra-low sulfur diesel only. 120V/240V/480V selector switch lock out tag out rules apply.",
    description: "Whisper-quiet towable diesel generator engineered for continuous construction, municipal, and event standby power. Features sound-attenuated aluminum enclosure and 24+ hour run time fuel cell.",
    images: [
      "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Generac",
      "Prime Output": "36 kW / 45 kVA (3-Phase)",
      Voltage: "Multi-voltage selector (120/240V single, 208/480V three)",
      "Fuel Capacity": "100 gal runtime up to 34 hrs",
      "Sound Level": "65 dBA at 23 ft"
    },
    location: {
      city: "San Marcos",
      state: "TX",
      address: "305 Power Grid Way"
    },
    availability: true,
    ownerId: "owner_seed_2",
    ownerName: "Northstar Plant Rentals",
    ownerEmail: "dispatch@northstarrentals.com",
    status: "Approved",
    isFeatured: true,
    rating: 5.0,
    totalReviews: 14,
    totalBookings: 28,
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    title: "Wacker Neuson LTV6 Compact Vertical Mast Mobile Light Tower",
    equipmentName: "Wacker Neuson LTV6 Compact Vertical Mast Mobile Light Tower",
    category: "Generators & Power",
    rentalType: "Daily",
    rentalPrice: 130,
    pricePerDay: 130,
    availableQuantity: 4,
    securityDeposit: 220,
    condition: "Brand New",
    brand: "Wacker Neuson",
    model: "LTV6",
    rentalTerms: "Towing requires 2-inch ball or pintle hitch. Retract vertical mast completely before transport.",
    description: "Compact footprint towable lighting tower with 23 ft vertical mast and four 1,100W metal halide fixtures. Powered by a fuel-efficient Kohler diesel engine with 45-gallon internal fuel tank.",
    images: [
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80"
    ],
    specifications: {
      Brand: "Wacker Neuson",
      Lighting: "4 x 1,100W Metal Halide Fixtures (440,000 Lumens)",
      "Mast Height": "23 ft vertical extendable with dual winches",
      Engine: "Kohler Tier 4 Final Diesel",
      "Run Time": "95 hours on single tank"
    },
    location: {
      city: "Round Rock",
      state: "TX",
      address: "1200 Nightworks Way"
    },
    availability: true,
    ownerId: "6b02c021880b5bac050c0862",
    ownerName: "Mohammad Yasin",
    ownerEmail: "yasinmunna46@gmail.com",
    status: "Approved",
    isFeatured: false,
    rating: 4.9,
    totalReviews: 11,
    totalBookings: 26,
    createdAt: new Date(Date.now() - 3 * 86400000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

async function insert20Equipment() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection("equipment");

    const result = await col.insertMany(NEW_20_EQUIPMENT);
    console.log(`[Success] Inserted ${result.insertedCount} new equipment items!`);
    const total = await col.countDocuments();
    console.log(`[Total Equipment in DB] Now contains: ${total} items.`);
  } catch (err) {
    console.error("[Insert Error]", err);
  } finally {
    await client.close();
  }
}

insert20Equipment().then(() => process.exit(0));
