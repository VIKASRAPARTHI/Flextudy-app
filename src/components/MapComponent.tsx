import React, { forwardRef } from 'react';
import MapView, { MapViewProps, Marker } from 'react-native-maps';

export interface MapComponentProps extends MapViewProps {
    children?: React.ReactNode;
}

const MapComponent = forwardRef<MapView, MapComponentProps>((props, ref) => {
    return (
        <MapView ref={ref} {...props} />
    );
});

export { MapComponent, Marker };
export const PROVIDER_GOOGLE = 'google'; // Or import from react-native-maps if strict typing needed, but string is fine.
