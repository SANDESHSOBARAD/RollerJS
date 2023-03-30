import {Roller} from './Roller';

describe("Smoke test", ()=> {
  test("The test scaffold runs successfully.", ()=> {
    expect(true).toBe(true);
  });
})

describe("Roller tests", ()=> {
  describe('constructor', () => {
    test('should create a Roller with 2 faces if no value is provided', () => {
      const roller = new Roller(1);
      expect(roller instanceof Roller).toBe(true);
      expect(roller['_faces']).toBe(2);
    });

    test('should create a Roller with the specified number of faces if it is between 2 and 20', () => {
      const roller = new Roller(10);
      expect(roller instanceof Roller).toBe(true);
      expect(roller['_faces']).toBe(10);
    });

    test('should create a Roller with 2 faces if the specified number of faces is less than 2', () => {
      const roller = new Roller(-10);
      expect(roller instanceof Roller).toBe(true);
      expect(roller['_faces']).toBe(2);
    });

    test('should create a Roller with 20 faces if the specified number of faces is greater than 20', () => {
      const roller = new Roller(30);
      expect(roller instanceof Roller).toBe(true);
      expect(roller['_faces']).toBe(20);
    });

    test('should truncate any non-integer values of faces to an integer', () => {
      const roller1 = new Roller(3.5);
      const roller2 = new Roller(7);
      const roller3 = new Roller(null);
      expect(roller1['_faces']).toBe(3);
      expect(roller2['_faces']).toBe(7);
      expect(roller3['_faces']).toBe(2);
    });
  });

  test('should return the value of the rolled number and update the distribution for a valid roll', () => {
    const roller = new Roller(6);
    const value = roller.roll(4);
    expect(value).toBe(4);
    expect(roller['_last']).toBe(4);
    expect(roller['_distribution'].get(4)).toBe(1);
  });

  test('distribution() should return a Map with correct keys and values after rolls', () => {
    const roller = new Roller(6);
    roller.roll(1);
    roller.roll(2);
    roller.roll(3);
    roller.roll(3);
    roller.roll(4);
    roller.roll(4);
    roller.roll(4);
    roller.roll(5);
    roller.roll(6);
    expect(roller.distribution().size).toBe(6);
    expect(roller.distribution().get(1)).toBe(1);
    expect(roller.distribution().get(2)).toBe(1);
    expect(roller.distribution().get(3)).toBe(2);
    expect(roller.distribution().get(4)).toBe(3);
    expect(roller.distribution().get(5)).toBe(1);
    expect(roller.distribution().get(6)).toBe(1);
  });

  test('distribution() should return a Map with correct keys and values after no rolls', () => {
    const roller = new Roller(6);
    expect(roller.distribution().size).toBe(6);
    expect(roller.distribution().get(1)).toBe(0);
    expect(roller.distribution().get(2)).toBe(0);
    expect(roller.distribution().get(3)).toBe(0);
    expect(roller.distribution().get(4)).toBe(0);
    expect(roller.distribution().get(5)).toBe(0);
    expect(roller.distribution().get(6)).toBe(0);
  });
  
  test('last() should return the correct value after rolls are made', () => {
    const roller = new Roller(6);
    roller.roll(1);
    roller.roll(2);
    expect(roller.last()).toBe(2);
    roller.roll(3);
    expect(roller.last()).toBe(3);
    roller.roll(3);
    expect(roller.last()).toBe(3);
    roller.roll(4);
    roller.roll(4);
    roller.roll(4);
    expect(roller.last()).toBe(4);
    roller.roll(5);
    roller.roll(6);
    expect(roller.last()).toBe(6);
  });
});