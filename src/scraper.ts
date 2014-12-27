import models  = require('./models');

export = Scraper
class Scraper {
    constructor() {
    }
    title(document: Document): string {
        return document.title;
    }
    extractPlaylist(document: Document): models.Playlist {
        var playlists = new models.Playlist(document);
        var iframes   = document.getElementsByTagName('iframe');
        var found;
        for(var i = 0; i < iframes.length; i++) {
            var src = iframes.item(i).src
            if (src.match(/www.youtube.com\/embed/)) {
                found = src.match(/www.youtube.com\/embed\/(.+)/);
                var id    = found[1].split('?')[0]
                var t = new models.Track(models.Provider.Youtube, src, id);
                playlists.addTrack(t)
            } else if (src.match(/w.soundcloud.com\/player\//)) {
                found = decodeURI(src).match(/api.soundcloud.com%2Ftracks%2F(.+?)/)
                var t = new models.Track(models.Provider.SoundCloud, src, found[1]);
                playlists.addTrack(t)
            }
        }

        return playlists
    }
}
