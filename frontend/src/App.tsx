import React from 'react';

import { Framework } from './framework/Framework';

import './App.css'; // import the css file to enable your styles.
import { DisplayPlugin } from './framework/DisplayPlugin';

/**
 * Define the type of the props field for a React component
 */
interface Props {
    registeredPlugins: DisplayPlugin[];
}

class App extends React.Component<Props> {

    constructor(props: Props) {
        super(props);
    }
    
    componentDidMount(): void {}

    render(): React.ReactNode {
        return (
            <Framework registeredPlugins={this.props.registeredPlugins}></Framework>
        );
    }
}

export default App;