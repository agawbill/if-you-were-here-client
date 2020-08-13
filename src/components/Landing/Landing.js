import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Messages from "../../containers/Messages/Messages";
import MessageForm from "../../containers/MessageForm/MessageForm";
import Spinner from "../../components/UI/Spinners/FormSpinner/FormSpinner";
import styles from "./Landing.module.css";

const Landing = () => {
  const personsLoading = useSelector((state) => state.persons.loading);
  const messagesLoading = useSelector((state) => state.messages.loading);

  let landingBody = <Spinner />;

  if (!personsLoading && !messagesLoading) {
    landingBody = (
      <>
        <MessageForm />
        <div className={styles.Description}>
          <p>
            Each year, nearly 800,000 people across the entire world take their
            own life. It is our mission here to provide an outlet for those
            directly or indirectly impacted by suicide. We also want to extend a
            hand of hope if you, yourself, are suffering from depression and
            feel you are on the brink of suicide, that by reading these
            messages, you will see you have a support system and make the
            life-saving effort to reach out for help.
          </p>
          <p>
            This website hopes to offer such an outlet to the grieving loved
            ones and friends of those lost to suicide.
            <b>
              You can begin entering a personalized message above to your loved
              one, and it will be published here.
            </b>
          </p>
          <p>
            We have compiled a list of <Link to="/resources">resources</Link> if
            you are curious about statistics surroudning suicide, or you
            yourself are seriously contemplating suicide. If you have a resource
            you would like to add to the list, email us{" "}
            <a href="mailto:emailhere@gmail.com">here</a>.
          </p>
        </div>
        <Messages />
      </>
    );
  }

  return (
    <div className={styles.ContentContainer}>
      <h1 className={styles.Banner}>
        If you were here, I wish I could tell you...
      </h1>
      {landingBody}
    </div>
  );
};

export default Landing;
