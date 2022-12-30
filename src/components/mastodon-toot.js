import * as React from "react";

class MastodonToot extends React.Component {
  render() {
    // console.log(this.props.toot);
    let {
      content,
      account: { avatar, display_name, username },
      url,
    } = this.props.toot;

    const reblog = this.props.toot.reblog;
    let media = [];
    if (reblog !== null) {
      content = reblog.content;
      avatar = reblog.account.avatar;
      display_name = reblog.account.display_name;
      username = reblog.account.username;
      url = reblog.url;
      if (reblog.media_attachments !== []) {
        media = reblog.media_attachments;
      }
    }

    const tootContent = {
      __html: content,
    };

    return (
      <div className="group relative mb-1 w-2/3 max-w-screen-md snap-y rounded-md bg-white p-2">
        <button
          className="absolute bottom-0 right-0 z-10 m-1 mt-auto hidden content-center rounded-md bg-masto-violet p-1 blur-none group-hover:block"
          onClick={() => window.open(url, "_blank")}
        >
          View on Mastodon
        </button>
        <div className="flex">
          <img
            src={avatar}
            alt=""
            className="aspect-square w-1/12 rounded-md"
          />
          <div className="w-4/5 pl-2">
            <p className="text-black">{display_name}</p>
            <p className="text-slate-600">@{username}</p>
          </div>
        </div>
        <div className="space-y-2 p-2">
          <span
            className="space-y-5 text-black"
            dangerouslySetInnerHTML={tootContent}
          ></span>
          {media.map((image) => (
            <img
              src={image.url}
              alt={image.description}
              key={image.description}
              className="w-1/3 rounded-lg"
            />
          ))}
        </div>
      </div>
    );
  }
}

export default MastodonToot;
