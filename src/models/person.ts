import MediaType from "./media-type";

export default interface Person {
    id: number;
    profile_path: string;
    name: string;
    media_type: MediaType;
    known_for: { title: string }[];
}

