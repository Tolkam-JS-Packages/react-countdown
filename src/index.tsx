import * as React from 'react';
import { PureComponent, ReactNode } from 'react';

export default class Countdown extends PureComponent<IProps, IState> {

    public state = {
        left: 0,
    };

    /**
     * Timeout id
     */
    protected tId: any;


    /**
     * @param props
     * @param context
     */
    constructor(props: IProps, context: void) {
        super(props, context);
        if(props.ends) {
            this.state.left = this.getDiff(props.ends);
        }
    }

    /**
     * @inheritDoc
     */
    public componentDidMount(): void {
        this.count(this.props.ends);
    }

    /**
     * @inheritDoc
     */
    public componentDidUpdate(prevProps: IProps, prevState: IState): void {
        if(prevProps.ends !== this.props.ends) {
            this.count(false);
            this.count(this.props.ends);
        }
    }

    /**
     * @inheritDoc
     */
    public componentWillUnmount(): void {
        this.count(false);
    }

    /**
     * @inheritDoc
     */
    public render() {
        return this.props.children(this.toCountdown(this.state.left));
    }

    /**
     * Starts or stops the countdown
     *
     * @param ends
     */
    protected count = (ends: TEnds | false) => {
        const that = this;
        const onComplete = that.props.onComplete;
        const step = 1;

        let left: number;
        const run = (ends: TEnds) => {
            that.setState(() => {
                left = that.getDiff(ends);
                left = left < step ? 0 : left;

                return {left}
            }, () => {
                if(left === 0) {
                    this.count(false);
                    onComplete && onComplete();
                }
            });
        };

        if(!ends) {
            clearInterval(that.tId);
        } else {
            run(ends);
            that.tId = setInterval(run, step * 1e3, ends);
        }
    };

    /**
     * Calculates the time difference in seconds
     *
     * @param ends
     */
    protected getDiff(ends: TEnds) {
        const now = Date.now();
        if(typeof ends !== 'number') {
            ends = ends instanceof Date ? ends : new Date(ends);
            ends = ends.getTime();
        }

        return Math.floor((ends - now) / 1e3);
    }

    /**
     * Converts seconds to countdown object
     *
     * @param secondsLeft
     */
    protected toCountdown(secondsLeft: number): ICountdown {
        const floor = Math.floor.bind(Math);
        const min = 60;
        const hour = min * min;
        const day = hour * 24;

        return {
            secondsLeft,
            s: floor(secondsLeft % min),
            m: floor(secondsLeft % hour/min),
            h: floor(secondsLeft % day/hour),
            d: floor(secondsLeft / day),
        };
    }
}

// time when countdown ends:
// Date instance, string parsable by Date or milliseconds left
type TEnds = Date | string | number;

interface IState {
    left: number;
}

export interface IProps extends React.HTMLProps<Countdown> {
    ends: TEnds;
    children: (countdown: ICountdown) => ReactNode;
    onComplete?: () => void;
}

export interface ICountdown {
    secondsLeft: number,
    s: number;
    m: number;
    h: number;
    d: number;
}
