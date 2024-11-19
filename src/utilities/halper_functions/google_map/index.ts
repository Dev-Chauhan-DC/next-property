import { IViewport } from "../../interfaces/search";

export function calculateDeltas(viewport: IViewport) {
    const { northeast, southwest } = viewport;

    // Calculate the deltas
    const latitudeDelta = northeast.lat - southwest.lat;
    const longitudeDelta = northeast.lng - southwest.lng;

    return { latitudeDelta, longitudeDelta };
}