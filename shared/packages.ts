/**
 * Menu options available for selection across all packages
 */
export const MENU_OPTIONS = {
  sandwiches: [
    "Ham & Cheese",
    "Egg Mayo & Cress",
    "Tuna Mayo",
    "BLT (Bacon Lettuce Tomato)",
    "Mature Cheddar & Pickle (V)",
    "Chicken & Bacon Mayo",
    "Turkey & Cranberry",
    "Coronation Chicken",
    "Roast Beef & Horseradish",
    "Prawn Mayo",
    "Cheese & Tomato (V)",
    "Hummus & Roasted Vegetables (VG)"
  ],

  cakes: [
    "Chocolate Fudge Cake",
    "Carrot Cake",
    "Lemon Drizzle Cake",
    "Victoria Sponge",
    "Coffee & Walnut Cake",
    "Chocolate Brownie",
    "Strawberry Cheesecake",
    "Apple Crumble Cake",
    "Chocolate Cake (VG)",
    "Carrot Cake (VG)",
    "Lemon Drizzle (GF)",
    "Brownie (GF)"
  ],

  canapes: [
    "Smoked Salmon Blini",
    "Chicken Liver Pâté",
    "Goat's Cheese & Onion Marmalade (V)",
    "Prawn Cocktail Tartlet",
    "Tomato & Mozzarella Skewer (V)",
    "Bruschetta (V)",
    "Vegetable Spring Roll (VG)",
    "Falafel & Mint Yoghurt (VG)",
    "Smoked Salmon & Cream Cheese Crostini (V)"
  ],

  pasta: [
    "Pesto Pasta (V)",
    "Four Cheese Pasta (V)",
    "Tuna Mayo Pasta",
    "Cheese & Tomato Pasta (V)",
    "Chicken & Broccoli Pasta",
    "Arrabbiata Pasta (VG)",
    "Pasta Primavera (V)",
    "Mushroom & Spinach (V)",
    "Mac & Cheese",
    "Roasted Veg & Orzo (VG)",
    "Sun-Dried Tomato Bruschetta Pasta (VG)"
  ],

  salads: [
    "Caesar Salad",
    "Greek Salad (V)",
    "Coleslaw (V)",
    "Israeli Couscous (V)",
    "Potato Salad (V)",
    "Green Salad (V)",
    "Mixed Bean (VG)",
    "Moroccan Couscous (VG)",
    "Tomato Salad (GF/V)",
    "Quinoa Salad (VG)",
    "Caprese Salad (V)"
  ],

  pizzas: [
    "Margherita Supreme (V)",
    "Pepperoni Overload",
    "BBQ Chicken & Red Onion",
    "Veggie Garden (V)",
    "Meat Feast",
    "Spicy Nduja & Ricotta",
    "Vegan Mediterranean (VEGAN)",
    "Hawaiian Hit",
    "Truffle Mushroom & Spinach (V)"
  ]
};

/**
 * Minimum guest count requirements for each service type
 */
export const MINIMUM_GUESTS = {
  hogRoast: 100,
  pizza: 50,
  buffet: 20,
  bar: 1, // No minimum for bar service
} as const;

export const PACKAGES = {
  /* ---------------------------
   *  HOG ROAST
   * ------------------------- */
  hog_standard: {
    id: "hog_standard",
    type: "hogRoast",
    name: "Standard Hog Roast",
    priceType: "perPerson" as const,
    priceGBP: 15,
    minimumGuests: 100,
    description:
      "Minimum 8 hour cooked hog roast with soft or crusty bread rolls, stuffing and apple sauce. Minimum 100 guests.",
    includesFixed: [
      "Minimum 8-hour cooked hog roast",
      "Soft or crusty bread rolls",
      "Stuffing",
      "Apple sauce"
    ],
    selectionRules: {
      salads: { maxChoices: 1 },
      pasta: { maxChoices: 1 }
    }
  },

  hog_full: {
    id: "hog_full",
    type: "hogRoast",
    name: "The Full Hog",
    priceType: "perPerson" as const,
    priceGBP: 20,
    minimumGuests: 100,
    description:
      "Hog roast with bread rolls, roasted potatoes, stuffing and apple sauce. Extra sides included. Minimum 100 guests.",
    includesFixed: [
      "Minimum 8-hour cooked hog roast",
      "Soft or crusty bread rolls",
      "Roasted potatoes",
      "Stuffing",
      "Apple sauce"
    ],
    selectionRules: {
      salads: { maxChoices: 2 },
      pasta: { maxChoices: 2 }
    }
  },

  hog_henry_viii: {
    id: "hog_henry_viii",
    type: "hogRoast",
    name: "Henry VIII",
    priceType: "perPerson" as const,
    priceGBP: 25,
    minimumGuests: 100,
    description:
      "Premium hog roast with new potatoes, roasted potatoes, gravy, multiple salads, pasta and canapés or desserts. Minimum 100 guests.",
    includesFixed: [
      "Minimum 8-hour cooked hog roast",
      "Soft or crusty bread rolls",
      "New potatoes tossed in butter and mustard",
      "Roasted potatoes",
      "Gravy",
      "Stuffing",
      "Apple sauce"
    ],
    selectionRules: {
      salads: { maxChoices: 3 },
      pasta: { maxChoices: 2 },
      canapesOrDesserts: { maxChoices: 2 }
    }
  },

  /* ---------------------------
   *  PIZZA
   * ------------------------- */
  pizza_party: {
    id: "pizza_party",
    type: "pizza",
    name: "Pizza Party",
    priceType: "perPerson" as const,
    priceGBP: 10,
    minimumGuests: 50,
    description: "Choose 2 pizzas plus garlic pizza bread. Minimum 50 guests.",
    includesFixed: ["Garlic pizza bread"],
    selectionRules: {
      pizzas: { maxChoices: 2 }
    }
  },

  pizza_bill_clinton: {
    id: "pizza_bill_clinton",
    type: "pizza",
    name: "The Bill Clinton",
    priceType: "perPerson" as const,
    priceGBP: 15,
    minimumGuests: 50,
    description: "Choose 3 pizzas, 1 pasta and 1 salad plus garlic pizza bread. Minimum 50 guests.",
    includesFixed: ["Garlic pizza bread"],
    selectionRules: {
      pizzas: { maxChoices: 3 },
      pasta: { maxChoices: 1 },
      salads: { maxChoices: 1 }
    }
  },

  pizza_epstein_island: {
    id: "pizza_epstein_island",
    type: "pizza",
    name: "Epstein Island",
    priceType: "perPerson" as const,
    priceGBP: 20,
    minimumGuests: 50,
    description: "Choose 5 pizzas, 2 pasta dishes and 2 salads plus garlic pizza bread. Minimum 50 guests.",
    includesFixed: ["Garlic pizza bread"],
    selectionRules: {
      pizzas: { maxChoices: 5 },
      pasta: { maxChoices: 2 },
      salads: { maxChoices: 2 }
    }
  },

  /* ---------------------------
   *  BUFFETS
   * ------------------------- */
  buffet_basic: {
    id: "buffet_basic",
    type: "buffet",
    name: "Basic Buffet",
    priceType: "perPerson" as const,
    priceGBP: 10,
    minimumGuests: 20,
    description:
      "Choose 3 sandwiches plus handmade sausage roll, crisps and 1 cake choice. Minimum 20 guests.",
    includesFixed: ["Handmade sausage roll", "Crisps"],
    selectionRules: {
      sandwiches: { maxChoices: 3 },
      cakes: { maxChoices: 1 }
    }
  },

  buffet_party: {
    id: "buffet_party",
    type: "buffet",
    name: "Party Buffet",
    priceType: "perPerson" as const,
    priceGBP: 12,
    minimumGuests: 20,
    description:
      "Choose 4 sandwiches and/or rolls plus handmade sausage roll, crisps, cakes, pizza slices, spring rolls and bhajis. Minimum 20 guests.",
    includesFixed: [
      "Handmade sausage roll",
      "Crisps",
      "Cakes (chef's selection)",
      "Pizza slices",
      "Spring rolls",
      "Bhajis"
    ],
    selectionRules: {
      sandwiches: { maxChoices: 4 }
    }
  },

  buffet_banquet: {
    id: "buffet_banquet",
    type: "buffet",
    name: "Banquet Buffet",
    priceType: "perPerson" as const,
    priceGBP: 15,
    minimumGuests: 20,
    description:
      "Choose 4 from sandwiches, wraps & rolls, plus 2 cakes, 1 salad, sausage roll, crisps and fruit platter. Minimum 20 guests.",
    includesFixed: [
      "Handmade sausage roll",
      "Crisps",
      "Fruit platter"
    ],
    selectionRules: {
      sandwiches: { maxChoices: 4 },
      cakes: { maxChoices: 2 },
      salads: { maxChoices: 1 }
    }
  },

  buffet_corporate: {
    id: "buffet_corporate",
    type: "buffet",
    name: "Corporate Buffet",
    priceType: "perPerson" as const,
    priceGBP: 20,
    minimumGuests: 20,
    description:
      "Choose 6 from sandwiches, wraps & rolls, plus 2 cakes, 1 salad, 2 canapés, sausage roll, crisps and fruit platter. Minimum 20 guests.",
    includesFixed: [
      "Handmade sausage roll",
      "Crisps",
      "Fruit platter"
    ],
    selectionRules: {
      sandwiches: { maxChoices: 6 },
      cakes: { maxChoices: 2 },
      salads: { maxChoices: 1 },
      canapes: { maxChoices: 2 }
    }
  },

  buffet_elite: {
    id: "buffet_elite",
    type: "buffet",
    name: "Elite Buffet",
    priceType: "perPerson" as const,
    priceGBP: 25,
    minimumGuests: 20,
    description:
      "Choose 8 sandwiches/wraps/rolls, 2 salads, 3 canapés and 3 cakes, plus handmade sausage roll, crisps, fruit platter and real pizza. Minimum 20 guests.",
    includesFixed: [
      "Handmade sausage roll",
      "Crisps",
      "Fruit platter",
      "Real pizza"
    ],
    selectionRules: {
      sandwiches: { maxChoices: 8 },
      salads: { maxChoices: 2 },
      canapes: { maxChoices: 3 },
      cakes: { maxChoices: 3 }
    }
  },

  /* ---------------------------
   *  MOBILE BAR
   * ------------------------- */
  bar_full: {
    id: "bar_full",
    type: "bar",
    name: "Fully Stocked Bar",
    priceType: "flat" as const,
    priceGBP: 250,
    minimumGuests: 1,
    description:
      "Selection of alcoholic and non-alcoholic drinks. Choose 1 lager barrel and 1 cider barrel, plus bottles, gins, whiskies etc.",
    includesFixed: [
      "Selection of alcoholic and non-alcoholic beverages",
      "Bottled beers",
      "Gins, whiskies, spirits & mixers"
    ],
    selectionRules: {
      lagerBarrel: { maxChoices: 1 },
      ciderBarrel: { maxChoices: 1 }
    },
    bonus: {
      thresholdGBP: 1000,
      refundGBP: 250,
      note: "If the bar takes over £1000, £250 is refunded after the event."
    }
  }
};

export type PackageId = keyof typeof PACKAGES;
export type PackageType = "hogRoast" | "pizza" | "buffet" | "bar";
export type Package = (typeof PACKAGES)[PackageId] & { minimumGuests?: number };
