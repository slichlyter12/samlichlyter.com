import * as React from "react";
// import { GatsbyImage } from "gatsby-plugin-image";

class MastodonToot extends React.Component {
  render() {
    const {
      content,
      account: { avatar, display_name, username },
      reblog: {
        content: reContent = "",
        account: {
          avatar: reblog_avatar = "",
          display_name: reblog_display_name = "",
          username: reblog_username = "",
        },
      },
    } = this.props.toot;
    const tootContent = {
      __html: content || reContent,
    };
    return (
      <div className="mb-1 w-2/3 rounded-md bg-white p-2">
        <div className="flex">
          <img
            src={reblog_avatar || avatar}
            alt=""
            className="aspect-square w-1/5 rounded-md"
          />
          <div className="w-4/5 pl-2">
            <p className="text-black">{reblog_display_name || display_name}</p>
            <p className="text-slate-600">@{reblog_username || username}</p>
          </div>
        </div>
        <p className="text-black" dangerouslySetInnerHTML={tootContent}></p>
      </div>
    );
  }
}

export default MastodonToot;
