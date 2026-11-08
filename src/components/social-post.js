import * as React from "react";

class SocialPost extends React.Component {
  render() {
    let {
      content,
      avatar,
      displayName,
      username,
      url,
      media_attachments,
      buttonColor,
      buttonText,
    } = this.props;
    return (
      <div className="group relative mb-1 w-2/3 max-w-screen-md snap-y rounded-md bg-white p-2">
        <button
          className={
            "absolute bottom-0 right-0 z-10 m-1 mt-auto hidden content-center rounded-md " +
            { buttonColor } +
            " group-hover:block} p-1 blur-none"
          }
          onClick={() => window.open(url, "_blank")}
        >
          {buttonText}
        </button>
        <div className="flex">
          <img
            src={avatar}
            alt=""
            className="aspect-square w-1/12 rounded-md"
          />
          <div className="w-4/5 pl-2">
            <p className="text-black">{displayName}</p>
            <p className="text-slate-600">@{username}</p>
          </div>
        </div>
        <div className="space-y-2 p-2">
          <span
            className="space-y-5 text-black"
            dangerouslySetInnerHTML={content}
          ></span>
          {media_attachments.map((image) => (
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

export default SocialPost;
