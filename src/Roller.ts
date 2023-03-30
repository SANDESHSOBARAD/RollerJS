export class Roller {
    private _distribution: Map<number, number>;
    private _last: number;
    private _faces: number;

    // specifies the number of faces the die has. It must have between 2 and 20
    // faces (inclusive). Any invalid values should default to 2 to represent 
    // the common coin flip. All numbers in this class should be truncated as
    // an integer if any non-integer number is provided.
    constructor(faces: number) {
        //to ensure if the value is in the valid range.
        this._faces = Math.max(2, Math.min(20, Math.trunc(faces)));
        
        this._distribution = new Map<number, number>();
        for (let i=1; i<=this._faces; i++){
            this._distribution.set(i,0);
        }
    }

    // specifies which number should be rolled and returns the recorded roll. 
    // If the value provided is not valid for the number of faces the die has,
    // no record of the roll should be made and 0 should be returned. However,
    // if the value provided is between 1 and the number of faces (inclusive),
    // then:
    //   1. that same value should be returned,
    //   2. that value should be stored as the last roll, and
    //   3. the distribution should update the distribution record so that the
    //      key (value rolled) has an updated value that increases the number
    //      of rolls for that face by 1
    roll(value: number): number{
        //to ensure the value is within the valid range
        value = value < 1 ? 1 : value;
        value = value > this._faces ? this._faces : value;
        const rVal = Math.trunc(value);

        //to update the distribution map and last roll value
        if(rVal >= 1 && rVal <= this._faces){
            this._distribution.set(rVal, this._distribution.get(rVal)! + 1);
            this._last = rVal;
        }

        return this._last;
    }

    // returns the value of the latest die roll. If no rolls have been made
    // yet, then it should return 0.
    last(): number {
        return this._last;
    }

    // returns a Map that represents the current distribution of rolls for each
    // possible face that can be rolled. The map's key should be the face
    // value and its value should be the number of times that face has been
    // rolled. Even if a face has not yet been rolled, its key should have a
    // value of 0.
    distribution(): Map<number, number>{
        return new Map<number, number>(this._distribution);
    }
} // end of Roller class