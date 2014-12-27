export enum Provider {
    Youtube,
    SoundCloud,
    Vimeo,
    Raw
}

export class Track {
    provider:  Provider;
    title:     string;
    url:       string;
    serviceId: string;
    constructor(provider: Provider, url: string, serviceId: string) {
        this.provider  = provider;
        this.url       = url;
        this.serviceId = serviceId;
    }

    toJSON(): any {
        return {
            provider:  Provider[this.provider],
            url:       this.url,
            serviceId: this.serviceId
        }
    }
}

export class Playlist {
    title:  string;
    tracks: Track[];
    constructor(document: Document) {
        this.title  = document.title
        this.tracks = []
    }
    addTrack(track: Track) {
        this.tracks.push(track);
    }
}

