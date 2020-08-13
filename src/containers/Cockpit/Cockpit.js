import React, { useEffect, Suspense } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { getPersons, fetchMessages } from "../../store/actions";
import { useDispatch } from "react-redux";
import Spinner from "../../components/UI/Spinners/FormSpinner/FormSpinner";
import ContentContainer from "../ContentContainer/ContentContainer";
import ScrollToTop from "../../components/UI/ScrollToTop";

const Landing = React.lazy(() => import("../../components/Landing/Landing"));
const FullMessage = React.lazy(() =>
  import("../../components/FullMessage/FullMessage")
);
const Resources = React.lazy(() =>
  import("../../components/Resources/Resources")
);

const Cockpit = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    Promise.all([dispatch(getPersons()), dispatch(fetchMessages())]);
  }, [dispatch]);

  let cockpitBody = (
    <>
      <ScrollToTop />
      <Suspense fallback={<Spinner />}>
        <Switch>
          <Route exact path="/message/:id">
            <ContentContainer>
              <FullMessage {...props} />
            </ContentContainer>
          </Route>
          <Route exact path="/resources">
            <ContentContainer>
              <Resources {...props} />
            </ContentContainer>
          </Route>
          <Route path="/">
            <Landing {...props} />
          </Route>
        </Switch>
      </Suspense>
    </>
  );

  return cockpitBody;
};

export default Cockpit;
