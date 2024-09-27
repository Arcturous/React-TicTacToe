import { ePlayerSymbol } from "../../Enums/ePlayerSymbol";

export class Player {
    public PlayerSymbol: ePlayerSymbol;

    public readonly userName: string;

    protected m_PreviousMoves: number[] = [];

    constructor(userName: string) {
        this.userName = userName;
    }
}