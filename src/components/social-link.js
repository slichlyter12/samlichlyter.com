import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class SocialLink extends React.Component {
  render() {
    const { social } = this.props;
    var rel = "noreferrer noopener";
    if (social.socialType === "mastodon") {
      rel += " me";
    }
    return (
      <li key={social.name}>
        <FontAwesomeIcon icon={social.icon} className="pr-1"></FontAwesomeIcon>
        <a
          href={social.link}
          target="_blank"
          rel={rel}
          className="hover:underline"
        >
          {social.name}
        </a>
      </li>
    );
  }
}

export default SocialLink;
