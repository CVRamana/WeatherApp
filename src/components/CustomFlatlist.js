import React from 'react';
import { FlatList } from 'react-native';

const CustomFlatlist = ({
    ...props
}) => (
        <FlatList
            data={props._data}
            renderItem={props._renderItem}
            keyExtractor={props.keyExtractor}
        />
    );

export default React.memo(CustomFlatlist);
