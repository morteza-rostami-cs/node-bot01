import Stats from "../../src/core/value-objects/Stats";

const validProps = {
  health: 10,
  maxHealth: 20,
  attack: 5,
  defense: 5,
  speed: 5,
};

describe("Stats", () => {
  describe("constructor validation", () => {
    // health can't go negative
    it("throws when health is negative", () => {
      expect(() => new Stats({ ...validProps, health: -1 })).toThrow(
        "stats can not be negative"
      );
    });

    // maxHealth can't be negative
    it("throws when maxHealth is negative", () => {
      expect(() => {
        return new Stats({ ...validProps, maxHealth: -1 });
      }).toThrow();
    });

    // attack can't be negative
    it("throws when attack is negative", () => {
      expect(() => {
        return new Stats({ ...validProps, attack: -1 });
      }).toThrow();
    });

    it("throws when defense is negative", () => {
      expect(() => {
        return new Stats({ ...validProps, defense: -1 });
      }).toThrow();
    });

    it("throws when speed is negative", () => {
      expect(() => {
        return new Stats({ ...validProps, speed: -1 });
      }).toThrow();
    });

    it("throws when health > maxHealth", () => {
      expect(() => {
        return new Stats({ ...validProps, health: 50, maxHealth: 20 });
      }).toThrow();
    });

    // all values zeros
    it("allows boundary values (health=0, attack=0, etc.)", () => {
      expect(() => {
        return new Stats({
          health: 0,
          maxHealth: 0,
          attack: 0,
          defense: 0,
          speed: 0,
        });
      }).not.toThrow();
    });
  });
});
