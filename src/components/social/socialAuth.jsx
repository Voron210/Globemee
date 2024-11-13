import React from "react";
import logoLinkedIn from "../../assets/logoLinkedIn.svg";
import logoGoogle from "../../assets/LogoGoogle.svg";
import { baseUrl } from "../../config";

const SocialAuth = (props) => {
  const { type = "" } = props;

  const social_block = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 32,
  };

  return (
    <div style={social_block}>
      <button
        className="social-auth"
        type="button"
        onClick={() =>
          (window.location.href = `${baseUrl}/t_authentication/google_login`)
        }
      >
        <img src={logoGoogle} />
        {/* {type==='login'?"Login":"Sign up"} with Google */}
      </button>
      <button
        className="social-auth"
        type="button"
        onClick={() =>
          (window.location.href = `${baseUrl}/t_authentication/linkedin_login`)
        }
      >
        <img src={logoLinkedIn} />
        {/* {type==='login'?"Login":"Sign up"} with LinkedIn */}
      </button>
    </div>
  );
};

export { SocialAuth };
