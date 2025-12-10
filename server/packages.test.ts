import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { PACKAGES, MENU_OPTIONS } from '@shared/packages';

describe('Packages System', () => {
  describe('Package Structure', () => {
    it('should have all required package types', () => {
      const types = new Set(Object.values(PACKAGES).map(p => p.type));
      expect(types.has('hogRoast')).toBe(true);
      expect(types.has('pizza')).toBe(true);
      expect(types.has('buffet')).toBe(true);
      expect(types.has('bar')).toBe(true);
    });

    it('should have valid pricing for all packages', () => {
      Object.values(PACKAGES).forEach(pkg => {
        expect(pkg.priceGBP).toBeGreaterThan(0);
        expect(['perPerson', 'flat']).toContain(pkg.priceType);
      });
    });

    it('should have descriptions for all packages', () => {
      Object.values(PACKAGES).forEach(pkg => {
        expect(pkg.description).toBeTruthy();
        expect(pkg.description.length).toBeGreaterThan(10);
      });
    });

    it('should have fixed inclusions for all packages', () => {
      Object.values(PACKAGES).forEach(pkg => {
        expect(Array.isArray(pkg.includesFixed)).toBe(true);
        expect(pkg.includesFixed.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Hog Roast Packages', () => {
    it('should have 3 hog roast packages', () => {
      const hogRoasts = Object.values(PACKAGES).filter(p => p.type === 'hogRoast');
      expect(hogRoasts.length).toBe(3);
    });

    it('should have increasing prices for hog roast tiers', () => {
      const hogRoasts = Object.values(PACKAGES)
        .filter(p => p.type === 'hogRoast')
        .sort((a, b) => a.priceGBP - b.priceGBP);
      
      expect(hogRoasts[0].priceGBP).toBe(15);
      expect(hogRoasts[1].priceGBP).toBe(20);
      expect(hogRoasts[2].priceGBP).toBe(25);
    });

    it('should have selection rules for hog roast packages', () => {
      const hogRoasts = Object.values(PACKAGES).filter(p => p.type === 'hogRoast');
      hogRoasts.forEach(pkg => {
        expect(Object.keys(pkg.selectionRules || {}).length).toBeGreaterThan(0);
      });
    });
  });

  describe('Pizza Packages', () => {
    it('should have 3 pizza packages', () => {
      const pizzas = Object.values(PACKAGES).filter(p => p.type === 'pizza');
      expect(pizzas.length).toBe(3);
    });

    it('should have pizza selection rules', () => {
      const pizzas = Object.values(PACKAGES).filter(p => p.type === 'pizza');
      pizzas.forEach(pkg => {
        expect(pkg.selectionRules?.pizzas).toBeDefined();
        expect(pkg.selectionRules?.pizzas?.maxChoices).toBeGreaterThan(0);
      });
    });
  });

  describe('Buffet Packages', () => {
    it('should have 5 buffet packages', () => {
      const buffets = Object.values(PACKAGES).filter(p => p.type === 'buffet');
      expect(buffets.length).toBe(5);
    });

    it('should have increasing complexity for buffet tiers', () => {
      const buffets = Object.values(PACKAGES)
        .filter(p => p.type === 'buffet')
        .sort((a, b) => a.priceGBP - b.priceGBP);
      
      // Each tier should allow more selections
      const basicRules = Object.values(buffets[0].selectionRules || {});
      const eliteRules = Object.values(buffets[buffets.length - 1].selectionRules || {});
      
      const basicTotal = basicRules.reduce((sum, rule: any) => sum + rule.maxChoices, 0);
      const eliteTotal = eliteRules.reduce((sum, rule: any) => sum + rule.maxChoices, 0);
      
      expect(eliteTotal).toBeGreaterThan(basicTotal);
    });
  });

  describe('Mobile Bar Package', () => {
    it('should have flat rate pricing', () => {
      const bar = PACKAGES.bar_full;
      expect(bar.priceType).toBe('flat');
    });

    it('should have bonus offer', () => {
      const bar = PACKAGES.bar_full as any;
      expect(bar.bonus).toBeDefined();
      expect(bar.bonus.thresholdGBP).toBe(1000);
      expect(bar.bonus.refundGBP).toBe(250);
    });
  });

  describe('Menu Options', () => {
    it('should have all menu categories', () => {
      expect(MENU_OPTIONS.sandwiches).toBeDefined();
      expect(MENU_OPTIONS.cakes).toBeDefined();
      expect(MENU_OPTIONS.canapes).toBeDefined();
      expect(MENU_OPTIONS.pasta).toBeDefined();
      expect(MENU_OPTIONS.salads).toBeDefined();
      expect(MENU_OPTIONS.pizzas).toBeDefined();
    });

    it('should have items in each category', () => {
      Object.entries(MENU_OPTIONS).forEach(([category, items]) => {
        expect(Array.isArray(items)).toBe(true);
        expect(items.length).toBeGreaterThan(0);
      });
    });

    it('should have unique items in each category', () => {
      Object.entries(MENU_OPTIONS).forEach(([category, items]) => {
        const uniqueItems = new Set(items);
        expect(uniqueItems.size).toBe(items.length);
      });
    });

    it('should have at least 9 sandwiches', () => {
      expect(MENU_OPTIONS.sandwiches.length).toBeGreaterThanOrEqual(9);
    });

    it('should have at least 9 pizzas', () => {
      expect(MENU_OPTIONS.pizzas.length).toBeGreaterThanOrEqual(9);
    });

    it('should have dietary options marked', () => {
      const allItems = Object.values(MENU_OPTIONS).flat();
      const vegetarianItems = allItems.filter(item => item.includes('(V)'));
      const veganItems = allItems.filter(item => item.includes('(VG)'));
      const glutenFreeItems = allItems.filter(item => item.includes('(GF)'));
      
      expect(vegetarianItems.length).toBeGreaterThan(0);
      expect(veganItems.length).toBeGreaterThan(0);
      expect(glutenFreeItems.length).toBeGreaterThan(0);
    });
  });

  describe('Package Selection Rules', () => {
    it('should enforce max choices for each category', () => {
      Object.values(PACKAGES).forEach(pkg => {
        Object.entries(pkg.selectionRules || {}).forEach(([category, rule]: any) => {
          expect(rule.maxChoices).toBeGreaterThan(0);
          expect(Number.isInteger(rule.maxChoices)).toBe(true);
        });
      });
    });

    it('should not exceed available items in selection rules', () => {
      Object.values(PACKAGES).forEach(pkg => {
        Object.entries(pkg.selectionRules || {}).forEach(([category, rule]: any) => {
          const availableItems = (MENU_OPTIONS as any)[category];
          if (availableItems) {
            expect(rule.maxChoices).toBeLessThanOrEqual(availableItems.length);
          }
        });
      });
    });
  });

  describe('Price Calculations', () => {
    it('should calculate per-person pricing correctly', () => {
      const hogStandard = PACKAGES.hog_standard;
      const guestCount = 50;
      const expectedTotal = hogStandard.priceGBP * guestCount;
      
      expect(expectedTotal).toBe(750);
    });

    it('should calculate flat rate pricing correctly', () => {
      const bar = PACKAGES.bar_full;
      expect(bar.priceGBP).toBe(250);
    });

    it('should handle bonus thresholds', () => {
      const bar = PACKAGES.bar_full as any;
      const takings = 1200; // Over threshold
      const refund = bar.bonus.refundGBP;
      const finalAmount = takings - refund;
      
      expect(finalAmount).toBe(950);
    });
  });
});
