import React from 'react';
import '../style/main.css';

class Countdown extends React.Component {
    state = {
        count: 20,
    };
    componentWillMount() {
        setInterval(() => {
            const { count } = this.state;
            this.setState({
                count: count-1 === 0 ? 20 : count-1
            })
        }, 1000);
    }
    render() {
        const { count } = this.state;
        const { text } = this.props;
        return (
            <div className="countdown">
                {`${text} ${count} seconds`}
            </div>
        )
    }
}

export default Countdown;
