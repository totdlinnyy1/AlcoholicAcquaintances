import React, {Component, Fragment} from 'react';
import {PullToRefresh} from '@vkontakte/vkui';

class ListOfRooms extends Component {
    constructor(prop) {
        super(prop);
        this.state={
            fetching: false
        }
        this.onRefresh = () => {
            this.setState({fetching: true});
            setTimeout(() => {
                this.setState({fetching: false})
            }, 1000);
        }
    }
    render() {
        return (
            <Fragment>
                <PullToRefresh onRefresh={this.onRefresh} isFetching={this.state.fetching}>
                    <h1>Список комнат</h1>
                </PullToRefresh>
            </Fragment>
        );
    }
}

export default ListOfRooms;