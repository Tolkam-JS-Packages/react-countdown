# tolkam/react-countdown

Simple countdown component.

## Usage

````tsx
import { render } from 'react-dom';
import Countdown from '@tolkam/react-countdown';

const myComponent = <Countdown ends={Date.now() + 5000}>{(countdown) => {
    const secondsLeft = countdown.secondsLeft;
    return <button disabled={secondsLeft > 0}>
        You can click me {secondsLeft ? 'in ' + secondsLeft : 'now!' }
    </button>
}}</Countdown>;

render(myComponent, document.getElementById('app'));
````

## Documentation

The code is rather self-explanatory and API is intended to be as simple as possible. Please, read the sources/Docblock if you have any questions. See [Usage](#usage) and [IProps](/src/index.tsx#L135) for quick start.

## License

Proprietary / Unlicensed 🤷
