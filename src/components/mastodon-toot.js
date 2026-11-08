import * as React from "react";
import SocialPost from "./social-post";

class MastodonToot extends React.Component {
  render() {
    let {
      content,
      account: { avatar, display_name, username },
      url,
      media_attachments,
    } = this.props.toot;

    const reblog = this.props.toot.reblog;
    if (reblog !== null) {
      content = reblog.content;
      avatar = reblog.account.avatar;
      display_name = reblog.account.display_name;
      username = reblog.account.username;
      url = reblog.url;
      if (reblog.media_attachments) {
        media_attachments = reblog.media_attachments;
      }
    }

    const tootContent = {
      __html: content,
    };

    return (
      <SocialPost
        content={tootContent}
        avatar={avatar}
        displayName={display_name}
        username={username}
        url={url}
        media_attachments={media_attachments}
        buttonColor={"bg-masto-purple"}
        buttonText="View on Mastodon"
      />
    );
  }
}

export default MastodonToot;
