import PageContent from '../Layout/PageContent';
import PageTitle from '../../common/PageTitle';
import classes from './BrowsePage.scss';
import AlbumItem from '../Albums/AlbumItem';
import PlaylistItem from '../Playlists/PlaylistItem';
import SongList from '../common/SongList/SongList';
import React from 'react';
import {withRouter} from 'react-router-dom';

class BrowsePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      charts: null,
    };

    this.ref = React.createRef();
  }

  async componentDidMount() {
    const music = MusicKit.getInstance();
    const charts = await music.api.charts(['songs', 'albums', 'playlists'], {limit: 40} );

    console.log(charts);

    this.setState({
      charts,
    })
  }

  render() {
    const {charts} = this.state;

    return (
      <PageContent innerRef={this.ref}>
        <PageTitle
          title={'Browse'}
          context={'Apple Music'}
        />

        <h3>Hot playlists</h3>
        <div className={classes.scrollWrapper}>
          <div className={cx(classes.scrollGrid, classes.doubleRow)}>
            {charts && charts.playlists[0].data.map((playlist, i) => {
              return (
                <PlaylistItem key={i} playlist={playlist} size={100}/>
              );
            })}
          </div>
        </div>
        <h3>Popular albums</h3>
        <div className={classes.scrollWrapper}>
          <div className={cx(classes.scrollGrid, classes.doubleRow)}>
            {charts && charts.albums[0].data.map((album, i) => {
              return (
                <AlbumItem key={i} album={album} size={100}/>
              );
            })}
          </div>
        </div>
        <h3>Top songs</h3>
        <div className={classes.chartingSongs}>
          {charts && (
            <SongList
              scrollElement={this.ref}
              load={() => charts.songs[0].data.slice(0, 10)}
              showArtist
              showAlbum
            />
          )}
        </div>
      </PageContent>
    );
  }
}

export default withRouter(BrowsePage);