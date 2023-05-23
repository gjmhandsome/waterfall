import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Waterfall extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: [],
        };
    }

    componentDidMount() {
        this.calculateColumns();
        window.addEventListener('resize', this.calculateColumns);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.calculateColumns);
    }

    componentDidUpdate(prevProps) {
        if (this.props.columnWidth !== prevProps.columnWidth) {
            this.calculateColumns();
        }
    }

    calculateColumns = () => {
        const { items, columnWidth } = this.props;
        const containerWidth = this.container.offsetWidth;
        const columnCount = Math.floor(containerWidth / columnWidth);
        const columns = [];

        for (let i = 0; i < columnCount; i++) {
            columns.push([]);
        }

        items.forEach((item) => {
            const columnIndex = this.getShortestColumnIndex(columns);
            columns[columnIndex].push(item);
        });

        this.setState({
            columns,
        });
    };

    getShortestColumnIndex = (columns) => {
        let shortestIndex = 0;
        let shortestHeight = columns[0].reduce((acc, item) => acc + item.height, 0);

        for (let i = 1; i < columns.length; i++) {
            const height = columns[i].reduce((acc, item) => acc + item.height, 0);

            if (height < shortestHeight) {
                shortestIndex = i;
                shortestHeight = height;
            }
        }

        return shortestIndex;
    };

    render() {
        const { columns } = this.state;
        const { columnWidth, renderCell } = this.props;

        return (
            <div ref={(el) => (this.container = el)}>
                {columns.map((column, index) => (
                    <div key={index} style={{ width: columnWidth, display: 'inline-block', verticalAlign: 'top' }}>
                        {column.map((item, index) => renderCell(item, index))}
                    </div>
                ))}
            </div>
        );
    }
}

Waterfall.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            height: PropTypes.number.isRequired,
        }),
    ).isRequired,
    columnWidth: PropTypes.number.isRequired,
    renderCell: PropTypes.func.isRequired,
};

export default Waterfall;
