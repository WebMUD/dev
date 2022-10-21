/* AutoGenerated Code, changes may be overwritten
* INPUT GRAMMAR:
* start := moveChoice
* move := '[MOVEmoveMove ]' | '[GOgoGo ]'
* moveChoice := move '[NORTHnorthNorth] ' | move '[SOUTHsouthSouth] '
*/
type Nullable<T> = T | null;
type $$RuleType<T> = () => Nullable<T>;
export interface ASTNodeIntf {
    kind: ASTKinds;
}
export enum ASTKinds {
    start = "start",
    move_1 = "move_1",
    move_2 = "move_2",
    moveChoice_1 = "moveChoice_1",
    moveChoice_2 = "moveChoice_2",
}
export type start = moveChoice;
export type move = move_1 | move_2;
export type move_1 = string;
export type move_2 = string;
export type moveChoice = moveChoice_1 | moveChoice_2;
export interface moveChoice_1 {
    kind: ASTKinds.moveChoice_1;
}
export interface moveChoice_2 {
    kind: ASTKinds.moveChoice_2;
}
export class Parser {
    private readonly input: string;
    private pos: PosInfo;
    private negating: boolean = false;
    private memoSafe: boolean = true;
    constructor(input: string) {
        this.pos = {overallPos: 0, line: 1, offset: 0};
        this.input = input;
    }
    public reset(pos: PosInfo) {
        this.pos = pos;
    }
    public finished(): boolean {
        return this.pos.overallPos === this.input.length;
    }
    public clearMemos(): void {
    }
    public matchstart($$dpth: number, $$cr?: ErrorTracker): Nullable<start> {
        return this.matchmoveChoice($$dpth + 1, $$cr);
    }
    public matchmove($$dpth: number, $$cr?: ErrorTracker): Nullable<move> {
        return this.choice<move>([
            () => this.matchmove_1($$dpth + 1, $$cr),
            () => this.matchmove_2($$dpth + 1, $$cr),
        ]);
    }
    public matchmove_1($$dpth: number, $$cr?: ErrorTracker): Nullable<move_1> {
        return this.regexAccept(String.raw`(?:[MOVEmoveMove ])`, $$dpth + 1, $$cr);
    }
    public matchmove_2($$dpth: number, $$cr?: ErrorTracker): Nullable<move_2> {
        return this.regexAccept(String.raw`(?:[GOgoGo ])`, $$dpth + 1, $$cr);
    }
    public matchmoveChoice($$dpth: number, $$cr?: ErrorTracker): Nullable<moveChoice> {
        return this.choice<moveChoice>([
            () => this.matchmoveChoice_1($$dpth + 1, $$cr),
            () => this.matchmoveChoice_2($$dpth + 1, $$cr),
        ]);
    }
    public matchmoveChoice_1($$dpth: number, $$cr?: ErrorTracker): Nullable<moveChoice_1> {
        return this.run<moveChoice_1>($$dpth,
            () => {
                let $$res: Nullable<moveChoice_1> = null;
                if (true
                    && this.matchmove($$dpth + 1, $$cr) !== null
                    && this.regexAccept(String.raw`(?:[NORTHnorthNorth] )`, $$dpth + 1, $$cr) !== null
                ) {
                    $$res = {kind: ASTKinds.moveChoice_1, };
                }
                return $$res;
            });
    }
    public matchmoveChoice_2($$dpth: number, $$cr?: ErrorTracker): Nullable<moveChoice_2> {
        return this.run<moveChoice_2>($$dpth,
            () => {
                let $$res: Nullable<moveChoice_2> = null;
                if (true
                    && this.matchmove($$dpth + 1, $$cr) !== null
                    && this.regexAccept(String.raw`(?:[SOUTHsouthSouth] )`, $$dpth + 1, $$cr) !== null
                ) {
                    $$res = {kind: ASTKinds.moveChoice_2, };
                }
                return $$res;
            });
    }
    public test(): boolean {
        const mrk = this.mark();
        const res = this.matchstart(0);
        const ans = res !== null;
        this.reset(mrk);
        return ans;
    }
    public parse(): ParseResult {
        const mrk = this.mark();
        const res = this.matchstart(0);
        if (res)
            return {ast: res, errs: []};
        this.reset(mrk);
        const rec = new ErrorTracker();
        this.clearMemos();
        this.matchstart(0, rec);
        const err = rec.getErr()
        return {ast: res, errs: err !== null ? [err] : []}
    }
    public mark(): PosInfo {
        return this.pos;
    }
    private loop<T>(func: $$RuleType<T>, star: boolean = false): Nullable<T[]> {
        const mrk = this.mark();
        const res: T[] = [];
        for (;;) {
            const t = func();
            if (t === null) {
                break;
            }
            res.push(t);
        }
        if (star || res.length > 0) {
            return res;
        }
        this.reset(mrk);
        return null;
    }
    private run<T>($$dpth: number, fn: $$RuleType<T>): Nullable<T> {
        const mrk = this.mark();
        const res = fn()
        if (res !== null)
            return res;
        this.reset(mrk);
        return null;
    }
    private choice<T>(fns: Array<$$RuleType<T>>): Nullable<T> {
        for (const f of fns) {
            const res = f();
            if (res !== null) {
                return res;
            }
        }
        return null;
    }
    private regexAccept(match: string, dpth: number, cr?: ErrorTracker): Nullable<string> {
        return this.run<string>(dpth,
            () => {
                const reg = new RegExp(match, "y");
                const mrk = this.mark();
                reg.lastIndex = mrk.overallPos;
                const res = this.tryConsume(reg);
                if(cr) {
                    cr.record(mrk, res, {
                        kind: "RegexMatch",
                        // We substring from 3 to len - 1 to strip off the
                        // non-capture group syntax added as a WebKit workaround
                        literal: match.substring(3, match.length - 1),
                        negated: this.negating,
                    });
                }
                return res;
            });
    }
    private tryConsume(reg: RegExp): Nullable<string> {
        const res = reg.exec(this.input);
        if (res) {
            let lineJmp = 0;
            let lind = -1;
            for (let i = 0; i < res[0].length; ++i) {
                if (res[0][i] === "\n") {
                    ++lineJmp;
                    lind = i;
                }
            }
            this.pos = {
                overallPos: reg.lastIndex,
                line: this.pos.line + lineJmp,
                offset: lind === -1 ? this.pos.offset + res[0].length : (res[0].length - lind - 1)
            };
            return res[0];
        }
        return null;
    }
    private noConsume<T>(fn: $$RuleType<T>): Nullable<T> {
        const mrk = this.mark();
        const res = fn();
        this.reset(mrk);
        return res;
    }
    private negate<T>(fn: $$RuleType<T>): Nullable<boolean> {
        const mrk = this.mark();
        const oneg = this.negating;
        this.negating = !oneg;
        const res = fn();
        this.negating = oneg;
        this.reset(mrk);
        return res === null ? true : null;
    }
    private memoise<K>(rule: $$RuleType<K>, memo: Map<number, [Nullable<K>, PosInfo]>): Nullable<K> {
        const $scope$pos = this.mark();
        const $scope$memoRes = memo.get($scope$pos.overallPos);
        if(this.memoSafe && $scope$memoRes !== undefined) {
        this.reset($scope$memoRes[1]);
        return $scope$memoRes[0];
        }
        const $scope$result = rule();
        if(this.memoSafe)
        memo.set($scope$pos.overallPos, [$scope$result, this.mark()]);
        return $scope$result;
    }
}
export function parse(s: string): ParseResult {
    const p = new Parser(s);
    return p.parse();
}
export interface ParseResult {
    ast: Nullable<start>;
    errs: SyntaxErr[];
}
export interface PosInfo {
    readonly overallPos: number;
    readonly line: number;
    readonly offset: number;
}
export interface RegexMatch {
    readonly kind: "RegexMatch";
    readonly negated: boolean;
    readonly literal: string;
}
export type EOFMatch = { kind: "EOF"; negated: boolean };
export type MatchAttempt = RegexMatch | EOFMatch;
export class SyntaxErr {
    public pos: PosInfo;
    public expmatches: MatchAttempt[];
    constructor(pos: PosInfo, expmatches: MatchAttempt[]) {
        this.pos = pos;
        this.expmatches = [...expmatches];
    }
    public toString(): string {
        return `Syntax Error at line ${this.pos.line}:${this.pos.offset}. Expected one of ${this.expmatches.map(x => x.kind === "EOF" ? " EOF" : ` ${x.negated ? 'not ': ''}'${x.literal}'`)}`;
    }
}
class ErrorTracker {
    private mxpos: PosInfo = {overallPos: -1, line: -1, offset: -1};
    private regexset: Set<string> = new Set();
    private pmatches: MatchAttempt[] = [];
    public record(pos: PosInfo, result: any, att: MatchAttempt) {
        if ((result === null) === att.negated)
            return;
        if (pos.overallPos > this.mxpos.overallPos) {
            this.mxpos = pos;
            this.pmatches = [];
            this.regexset.clear()
        }
        if (this.mxpos.overallPos === pos.overallPos) {
            if(att.kind === "RegexMatch") {
                if(!this.regexset.has(att.literal))
                    this.pmatches.push(att);
                this.regexset.add(att.literal);
            } else {
                this.pmatches.push(att);
            }
        }
    }
    public getErr(): SyntaxErr | null {
        if (this.mxpos.overallPos !== -1)
            return new SyntaxErr(this.mxpos, this.pmatches);
        return null;
    }
}