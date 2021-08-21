import React, {Component} from "react";
import {Route, Switch, Redirect, withRouter} from 'react-router-dom';
import './assets/css/theme/base.css';
import './assets/css/theme/login-6.css';
import './App.css';
import Login from "./components/Login/Login";
import UserPage from "./pages/UserPage";
import {AUTH_TOKEN} from "./shared/utility";
import Nav from "./components/Navbar/Nav";
import Footer from "./components/Footer/Footer";
import Logout from "./pages/Logout";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import AddAnnouncement from "./components/Announcement/AddAnnouncement"
import MyPublications from "./components/Announcement/MyPublications";
import AnnouncementPublicationDetails from "./components/Announcement/AnnouncementPublicationDetails";
import AllAnnouncementsPage from "./pages/AllAnnouncementsPage";
import PublicationsForAnnouncements from "./components/Announcement/PublicationsForAnnouncements";
import AddAttachment from "./components/Announcement/AddAttachment";
import FeedbackCrudTable from "./components/Feedback/FeedbackCrudTable";
import MyFeedbackPublications from "./components/Feedback/MyFeedbackPublications";
import DesignFeedbackItem from "./components/Feedback/DesignFeedbackItem";
import VisualizeFeedback from "./components/Feedback/VisualizeFeedback";
import VisualizeAnswers from "./components/Feedback/VisualizeAnswers";
import AnalyseFeedback from "./components/Feedback/AnalyseFeedback";
import PublicDocumentType from "./components/PublicDocument/PublicDocumentType";
import InstitutionCategoryCrudTable from "./components/InstitutionCategoryCrud/InstitutionCategoryCrudTable";
import AnnouncementPublicationReport from "./components/Announcement/AnnouncementPublicationReport";
import EditAnnouncement from "./components/Announcement/EditAnnouncement";
import FAQ from "./components/FAQ/FAQ";
import AddFAQ from "./components/FAQ/AddFAQ";
import EditFAQ from "./components/FAQ/EditFAQ";
import SidebarMenu from "./components/Sidebar/Sidebar"
import PreviewFeedback from "./components/Feedback/PreviewFeedback";
import Monitoring from "./components/PublicDocument/Monitoring";
import Tags from "./components/Tag/Tags";
import PublicDocument from "./components/PublicDocument/PublicDocument";
import AnnualReport from "./components/AnnualReport/AnnualReport"
import InactiveUsers from "./components/User/InactiveUsers";
import InstitutionTable from "./components/Institution/InstitutionTable";
import UsersTable from "./components/User/UsersTable";
import Question from "./components/Question/Question";
import EditQuestion from "./components/Question/EditQuestion";
import AddQuestion from "./components/Question/AddQuestion";
import QuestionDetails from "./components/Question/QuestionDetails";
import InactiveQuestions from "./components/Question/InactiveQuestions";
import EditMessage from "./components/Question/EditMessage";
import MyInstitution from "./components/Institution/MyInstitution";
import EditedInstitutions from "./components/Institution/EditedInstitutions";
import ReportsTable from "./components/Report/ReportsTable";
import NAP from "./components/NAP/NAP"
import NAPsList from "./components/NAP/NAPsList";
import Measure from "./components/Measure/Measure";
import Activity from "./components/Activity/Activity"
import AreaOfInterestTable from "./components/AreaOfInterest/AreaOfInterestTable";
import StatusTable from "./components/Status/StatusTable";
import NapAreaTypeTable from "./components/NapAreaType/NapAreaTypeTable";
import NapAreaTable from "./components/NapArea/NapAreaTable";
import StrategyGoalTable from "./components/StrategyGoal/StrategyGoalTable";
import Problem from "./components/Problem/Problem";
import ActivityInstitutionTable from "./components/ActivityInstitution/ActivityInstitutionTable";
import FeedbackToPublishNew from "./components/Feedback/FeedbackToPublishNew";
import FeedbackPreviousPublications from "./components/Feedback/FeedbackPreviousPublications";
import IndicatorTable from "./components/Indicator/IndicatorTable";
import IndicatorReportTable from "./components/IndicatorReport/IndicatorReportTable";
import InstitutionCategoryReorder from "./components/InstitutionCategoryCrud/InstitutionCategoryReorder";
import AnnouncementToPublishNew from "./components/Announcement/AnnouncementToPublishNew";
import SendRequest from "./components/SendingRequestEvaluation/SendRequest";
import AllRequestsPaged from "./components/SendingRequestEvaluation/AllRequestsPaged";
import MeetingsList from "./components/Meeting/MeetingsList";
import AddMeeting from "./components/Meeting/AddMeeting";
import MyActivities from "./components/Activity/MyActivities";



class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            role: "",
            data: {},
            openSidebar: false
        }
    }

    render() {
        let routes = (
            <Switch>
                <Route path="/login" component={Login}/>
                <Route path="/FAQ" component={FAQ}/>
                <Route path="/reset/password" exact component={ResetPassword}/>
                <Redirect to="/login"/>
            </Switch>
        );
        let authToken = localStorage.getItem(AUTH_TOKEN);
        let userRole = localStorage.getItem('role');
        if (authToken && authToken !== '') {
            if (userRole === "ROLE_ADMIN") {
                routes = this.adminRoutes();
            } else if (userRole === "ROLE_INSTITUTIONAL_MODERATOR") {
                routes = this.moderatorRoutes();
            } else if (userRole === "ROLE_EVALUATOR") {
                routes = this.evaluatorRoutes();
            }
        }

        return (
            <div style={{height: "100%"}}>
                {routes}
            </div>
        )
    }

    changeSidebarCollapse = () => {
        this.setState({
            openSidebar: !this.state.openSidebar
        })
    }

    adminRoutes = () => {
        return (
            <div style={{height: "100%"}}>

                <Nav openSidebarFunction={this.changeSidebarCollapse}/>

                <div style={{display: "flex", height: "100%"}}>
                    <SidebarMenu openSidebar={this.state.openSidebar}/>
                    <div className="container-fluid" style={{height: "100%", overflowY: "scroll"}}>
                        <Switch>
                            <Route path="/" exact component={MyActivities}/>
                            <Route path="/addannouncement" exact component={AddAnnouncement}/>
                            <Route path="/editAnnouncement/:id" component={EditAnnouncement}/>
                            <Route path="/mypublications" exact component={MyPublications}/>
                            <Route path="/myannouncements/:id" exact component={AnnouncementPublicationDetails}/>
                            <Route path="/allannouncements" exact component={AllAnnouncementsPage}/>
                            <Route path="/announcement/report" exact component={AnnouncementPublicationReport}/>
                            <Route path="/addattachment/:id" exact component={AddAttachment}/>
                            <Route path="/publish/:id" exact component={AnnouncementToPublishNew}/>
                            <Route path="/publications/:id" exact component={PublicationsForAnnouncements}/>
                            <Route path="/feedbacks" exact component={FeedbackCrudTable}/>
                            <Route path="/feedback/:id/previouspublications" exact component={FeedbackPreviousPublications}/>
                            <Route path="/publishfeedback/:id" exact component={FeedbackToPublishNew}/>
                            <Route path="/myfeedbackpublications" exact component={MyFeedbackPublications}/>
                            <Route path="/desingfeedback/:id" exact component={DesignFeedbackItem}/>
                            <Route path="/previewfeedback/:id" exact component={PreviewFeedback}/>
                            <Route path="/visualizeFeedback/:id" exact component={VisualizeFeedback}/>
                            <Route path="/visualizeAnswers/:id" exact component={VisualizeAnswers}/>
                            <Route path="/analyse/:id" exact component={AnalyseFeedback}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/users" exact component={UsersTable}/>
                            <Route path="/users/inactive" exact component={InactiveUsers}/>
                            <Route path="/institutions" exact component={InstitutionTable}/>
                            <Route path="/tags" exact component={Tags}/>
                            <Route path="/publicdocument" exact component={PublicDocument}/>
                            <Route path="/monitoring" exact component={Monitoring}/>
                            <Route path="/publicdoctypes" exact component={PublicDocumentType}/>
                            <Route path="/logout" component={Logout}/>
                            <Route path="/changepassword" exact component={ChangePassword}/>
                            <Route path="/institutioncategory" exact component={InstitutionCategoryCrudTable}/>
                            <Route path="/institutioncategory/reorder" exact component={InstitutionCategoryReorder}/>
                            <Route path="/FAQ" component={FAQ}/>
                            <Route path="/AddFAQ" component={AddFAQ}/>
                            <Route path="/EditFAQ" component={EditFAQ}/>
                            <Route path="/SidebarMenu" component={SidebarMenu}/>
                            <Route path="/AnnualReport" component={AnnualReport}/>
                            <Route path="/Question" component={Question}/>
                            <Route path="/EditQuestion" component={EditQuestion}/>
                            <Route path="/AddQuestion" component={AddQuestion}/>
                            <Route path="/previewQuestion/:id" exact component={QuestionDetails}/>
                            <Route path="/EditMessage" component={EditMessage}/>
                            <Route path="/EditedInstitutions" component={EditedInstitutions}/>
                            <Route path="/nap/:id" component={withRouter(NAP)}/>
                            <Route path="/naps" component={NAPsList}/>
                            <Route path="/measure/:id" component={Measure}/>
                            <Route path="/activity/:id" component={Activity}/>
                            <Route path="/areasOfInterest" component={AreaOfInterestTable}/>
                            <Route path="/status" component={StatusTable}/>
                            <Route path="/areaType" component={NapAreaTypeTable}/>
                            <Route path="/napArea" component={NapAreaTable}/>
                            <Route path="/strategyGoal" component={StrategyGoalTable}/>
                            <Route path="/problem/:id" component={Problem}/>
                            <Route path="/activityInstitution" component={ActivityInstitutionTable}/>
                            <Route path="/indicators/:id" exact component={IndicatorTable}/>
                            <Route path="/indicatorReports/:id" exact component={IndicatorReportTable}/>
                            <Route path="/sendRequest" component={SendRequest}/>
                            <Route path="/allRequests" component={AllRequestsPaged}/>
                            <Route path="/meetings" component={MeetingsList}/>
                            <Route path="/addMeeting" component={AddMeeting}/>
                        </Switch>
                    </div>
                </div>

                <Footer/>

            </div>
        );
    };

    moderatorRoutes = () => {
        return (
            <div style={{height: "100%"}}>

                <Nav openSidebarFunction={this.changeSidebarCollapse}/>

                <div style={{display: "flex", height: "100%"}}>
                    <SidebarMenu openSidebar={this.state.openSidebar}/>
                    <div className="container-fluid" style={{height: "100%", overflowY: "scroll"}}>
                        <Switch>
                            <Route path="/" exact component={MyActivities}/>
                            <Route path="/mypublications" exact component={MyPublications}/>
                            <Route path="/myannouncements/:id" exact component={AnnouncementPublicationDetails}/>
                            <Route path="/addattachment/:id" exact component={AddAttachment}/>
                            <Route path="/publications/:id" exact component={PublicationsForAnnouncements}/>
                            <Route path="/myfeedbackpublications" exact component={MyFeedbackPublications}/>
                            <Route path="/visualizeFeedback/:id" exact component={VisualizeFeedback}/>
                            <Route path="/visualizeAnswers/:id" exact component={VisualizeAnswers}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/users" exact component={UserPage}/>
                            <Route path="/publicdocument" exact component={PublicDocument}/>
                            <Route path="/logout" component={Logout}/>
                            <Route path="/changepassword" exact component={ChangePassword}/>
                            <Route path="/FAQ" component={FAQ}/>
                            <Route path="/AnnualReport" component={AnnualReport}/>
                            <Route path="/Question" component={Question}/>
                            <Route path="/EditQuestion" component={EditQuestion}/>
                            <Route path="/AddQuestion" component={AddQuestion}/>
                            <Route path="/previewQuestion/:id" exact component={QuestionDetails}/>
                            <Route path="/questions/inactive" exact component={InactiveQuestions}/>
                            <Route path="/EditMessage" component={EditMessage}/>
                            <Route path="/myInstitution" component={MyInstitution}/>
                            <Route path="/nap/:id" component={withRouter(NAP)}/>
                            <Route path="/naps" component={NAPsList}/>
                            <Route path="/measure/:id" component={Measure}/>
                            <Route path="/activity/:id" component={Activity}/>
                            {/*<Route path="/areasOfInterest" component={AreaOfInterestTable}/>*/}
                            {/*<Route path="/status" component={StatusTable}/>*/}
                            {/*<Route path="/areaType" component={NapAreaTypeTable}/>*/}
                            {/*<Route path="/napArea" component={NapAreaTable}/>*/}
                            {/*<Route path="/strategyGoal" component={StrategyGoalTable}/>*/}
                            <Route path="/problem/:id" component={Problem}/>
                            <Route path="/activityInstitution" component={ActivityInstitutionTable}/>
                            <Route path="/indicators/:id" exact component={IndicatorTable}/>
                            <Route path="/indicatorReports/:id" exact component={IndicatorReportTable}/>
                            <Route path="/meetings" component={MeetingsList}/>
                        </Switch>
                    </div>
                </div>

                <Footer/>

            </div>

        );
    };


    evaluatorRoutes = () => {
        return (
            <div style={{height: "100%"}}>

                <Nav openSidebarFunction={this.changeSidebarCollapse}/>

                <div style={{display: "flex", height: "100%"}}>
                    <SidebarMenu openSidebar={this.state.openSidebar}/>
                    <div className="container-fluid" style={{height: "100%", overflowY: "scroll"}}>
                        <Switch>
                            <Route path="/" exact component={MyActivities}/>
                            <Route path="/mypublications" exact component={MyPublications}/>
                            <Route path="/myannouncements/:id" exact component={AnnouncementPublicationDetails}/>
                            <Route path="/addattachment/:id" exact component={AddAttachment}/>
                            <Route path="/publications/:id" exact component={PublicationsForAnnouncements}/>
                            <Route path="/myfeedbackpublications" exact component={MyFeedbackPublications}/>
                            <Route path="/visualizeFeedback/:id" exact component={VisualizeFeedback}/>
                            <Route path="/visualizeAnswers/:id" exact component={VisualizeAnswers}/>
                            <Route path="/login" component={Login}/>
                            <Route path="/users" exact component={UserPage}/>
                            <Route path="/publicdocument" exact component={PublicDocument}/>
                            <Route path="/logout" component={Logout}/>
                            <Route path="/changepassword" exact component={ChangePassword}/>
                            <Route path="/FAQ" component={FAQ}/>
                            <Route path="/AnnualReport" component={AnnualReport}/>
                            <Route path="/Question" component={Question}/>
                            <Route path="/EditQuestion" component={EditQuestion}/>
                            <Route path="/AddQuestion" component={AddQuestion}/>
                            <Route path="/previewQuestion/:id" exact component={QuestionDetails}/>
                            <Route path="/questions/inactive" exact component={InactiveQuestions}/>
                            <Route path="/EditMessage" component={EditMessage}/>
                            <Route path="/myInstitution" component={MyInstitution}/>
                            <Route path="/reports" component={ReportsTable}/>
                            <Route path="/nap/:id" component={withRouter(NAP)}/>
                            <Route path="/naps" component={NAPsList}/>
                            <Route path="/measure/:id" component={Measure}/>
                            <Route path="/activity/:id" component={Activity}/>
                            <Route path="/areasOfInterest" component={AreaOfInterestTable}/>
                            <Route path="/status" component={StatusTable}/>
                            <Route path="/areaType" component={NapAreaTypeTable}/>
                            <Route path="/napArea" component={NapAreaTable}/>
                            <Route path="/strategyGoal" component={StrategyGoalTable}/>
                            <Route path="/problem/:id" component={Problem}/>
                            <Route path="/activityInstitution" component={ActivityInstitutionTable}/>
                            <Route path="/indicators/:id" exact component={IndicatorTable}/>
                            <Route path="/indicatorReports/:id" exact component={IndicatorReportTable}/>
                        </Switch>
                    </div>
                </div>

                <Footer/>

            </div>

        );
    };

}

export default withRouter(App);

