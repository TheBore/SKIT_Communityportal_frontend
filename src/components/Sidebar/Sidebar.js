import React from 'react'
import {Badge} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
    faFileAlt,
    faPencilAlt,
    faPoll,
    faQuestion,
    faScroll,
    faUserCog,
    faThList,
    faBookmark,
    faPhoneSquare
} from "@fortawesome/free-solid-svg-icons";
import {
    ProSidebar,
    Menu,
    MenuItem,
    SubMenu,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
} from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './Sidebar.css'
import {strings} from "../../Localization/Localization";
import {NavLink} from "react-router-dom";
import NAPRepository from "../../repository/NAPRepository.js"

class SidebarMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userRole: localStorage.getItem('role'),
            naps: [],
        }
    }

    componentDidMount() {
        strings.setLanguage(localStorage.getItem("activeLanguage"));
        NAPRepository.getRecentNAPs().then(res => {
            this.setState({
                naps: res.data
            })
        })
    }

    render() {

        let language = localStorage.getItem("activeLanguage");

        let administrationAdmin = [
            {
                label: strings.users,
                imgSrc: 'icon-point-contact.png',
                path: '/users'
            },
            {
                label: strings.institutions,
                imgSrc: 'icon-point-contact.png',
                path: '/institutions'
            },
            {
                label: strings.tags,
                imgSrc: 'icon-profile.png',
                path: '/tags'
            },
            {
                label: strings.institutionCategory,
                imgSrc: 'icon-profile.png',
                path: '/institutioncategory'
            }
        ]

        let announcAdmin = [
            {
                label: strings.mypublications,
                imgSrc: 'icon-documentation.png',
                path: '/mypublications'
            },
            {
                label: strings.allannouncements,
                imgSrc: 'icon-documentation.png',
                path: '/allannouncements'
            },
            {
                label: strings.readAnnouncements,
                imgSrc: 'icon-documentation.png',
                path: '/announcement/report'
            }
        ]
        let questionsAdmin = [
            {
                label: strings.questions,
                imgSrc: 'icon-offerings.png',
                path: '/Question'
            },
        ]
        let feedbackAdmin = [
            {
                label: strings.feedbacks,
                imgSrc: 'icon-audit.png',
                path: '/feedbacks'
            },
            {
                label: strings.myfeedbackpublications,
                imgSrc: 'icon-audit.png',
                path: '/myfeedbackpublications'
            }
        ]
        let pubDocAdmin = [
            {
                label: strings.PublicDocumentsRegistry,
                imgSrc: 'icon-audit.png',
                path: '/publicdocument'
            },
            {
                label: strings.PublicDocumentTypes,
                imgSrc: 'icon-audit.png',
                path: '/publicdoctypes'
            },
            {
                label: strings.monitoringOnPublicBodies,
                imgSrc: 'icon-audit.png',
                path: '/monitoring'
            }
        ]

        let napsAdmin = []

        napsAdmin.push({
            label: localStorage.getItem('role') === "ROLE_ADMIN" || localStorage.getItem('role') === "ROLE_MODERATOR"
                ? strings.activities : strings.myActivities,
            imgSrc: 'icon-audit.png',
            path: '/'
        })

        if(this.state.naps.length > 2){
            napsAdmin.push({
                id: null,
                label: strings.remainingNaps,
                imgSrc: 'icon-audit.png',
                path: '/naps'
            })
        }

        this.state.naps.map((item,index) => {
            napsAdmin.push({
                id: item.id,
                label: language === 'mk'? item.nameMk : item.nameAl,
                imgSrc: 'icon-audit.png',
                path: `/nap/${item.id}`
            })
        })

        let crudItems = [
            {
                label: strings.areasOfInterest,
                imgSrc: 'icon-audit.png',
                path: '/areasOfInterest'
            },
            {
                label: strings.statuses,
                imgSrc: 'icon-audit.png',
                path: '/status'
            },
            {
                label: strings.areaTypes,
                imgSrc: 'icon-audit.png',
                path: '/areaType'
            },
            {
                label: strings.napAreas,
                imgSrc: 'icon-audit.png',
                path: '/napArea'
            },
            {
                label: strings.strategyGoals,
                imgSrc: 'icon-audit.png',
                path: '/strategyGoal'
            },
            {
                label: strings.responsibleInstitutions,
                imgSrc: 'icon-audit.png',
                path: '/activityInstitution'
            }
        ]

        let meetingsAdmin = [
            {
                label: strings.allMeetings,
                imgSrc: 'icon-documentation.png',
                path: '/meetings'
            },
        ];

        let meetingsModerator = [
            {
                label: strings.myMeetings,
                imgSrc: 'icon-documentation.png',
                path: '/meetings'
            },
        ];

        let meetingsEvaluator = [
            {
                label: strings.myMeetings,
                imgSrc: 'icon-documentation.png',
                path: '/meetings'
            },
        ];

        let administrationModerator = [
            {
                label: strings.users,
                imgSrc: 'icon-point-contact.png',
                path: '/users'
            },
            {
                label: strings.myInst,
                imgSrc: 'icon-point-contact.png',
                path: '/myInstitution'
            },
        ]
        let announcModerator = [
            {
                label: strings.mypublications,
                imgSrc: 'icon-documentation.png',
                path: '/mypublications'
            },
        ]
        let feedbackModerator = [

            {
                label: strings.myfeedbackpublications,
                imgSrc: 'icon-audit.png',
                path: '/myfeedbackpublications'
            }
        ];
        let pubDocModerator = [
            {
                label: strings.PublicDocumentsRegistry,
                imgSrc: 'icon-audit.png',
                path: '/publicdocument',
            }
        ]
        let announcUser = [
            {
                label: strings.mypublications,
                imgSrc: 'icon-documentation.png',
                path: '/mypublications'
            },
            {
                label: strings.allannouncements,
                imgSrc: 'icon-documentation.png',
                path: '/allannouncements'
            }]

        let feedbackUser = [
            {
                label: strings.feedbacks,
                imgSrc: 'icon-audit.png',
                path: '/feedbacks'
            },
            {
                label: strings.myfeedbackpublications,
                imgSrc: 'icon-audit.png',
                path: '/myfeedbackpublications'
            }
        ];
        let pubDocUser = [
            {
                label: strings.PublicDocumentsRegistry,
                imgSrc: 'icon-audit.png',
                path: '/publicdocument'
            }
        ]

        let reportsEvaluator = [
            {
                label: strings.allReports,
                imgSrc: 'icon-audit.png',
                path: '/reports'
            }
        ]

        let items = null;

        // Admin menu items
        if (this.state.userRole === "ROLE_ADMIN") {
            items = <>

                <SubMenu className={"submenu"} title={strings.administration} suffix={<Badge pill variant="danger">Admin</Badge>}
                         icon={<FontAwesomeIcon icon={faUserCog}/>}>
                    {administrationAdmin.map((item, index) => {
                        return (<MenuItem key={index}>
                                        <NavLink to={item.path}>
                                            {item.label}
                                        </NavLink>
                                    </MenuItem>)
                                })}
                            </SubMenu>

                <SubMenu title={strings.announcement} icon={<FontAwesomeIcon icon={faScroll}/>}>
                    {announcAdmin.map((item, index) => {
                        return (<MenuItem key={index}>
                            <NavLink to={item.path}>
                                {item.label}
                            </NavLink>
                        </MenuItem>)
                    })}
                </SubMenu>

                {/*<SubMenu title={strings.questions} icon={<FontAwesomeIcon icon={faQuestion}/>}>*/}
                {/*    {questionsAdmin.map((item, index) => {*/}
                {/*        return (<MenuItem key={index}>*/}
                {/*            <NavLink to={item.path}>*/}
                {/*                {item.label}*/}
                {/*            </NavLink>*/}
                {/*        </MenuItem>)*/}
                {/*    })}*/}
                {/*</SubMenu>*/}

                <SubMenu title={strings.feedbacks} icon={<FontAwesomeIcon icon={faPoll}/>}>
                    {feedbackAdmin.map((item, index) => {
                        return (<MenuItem key={index}>
                            <NavLink to={item.path}>
                                {item.label}
                            </NavLink>
                        </MenuItem>)
                    })}
                </SubMenu>

                {/*<SubMenu title={strings.publicDocuments} icon={<FontAwesomeIcon icon={faFileAlt}/>}>*/}
                {/*    {pubDocAdmin.map((item, index) => {*/}
                {/*        return (<MenuItem key={index}>*/}
                {/*            <NavLink to={item.path}>*/}
                {/*                {item.label}*/}
                {/*            </NavLink>*/}
                {/*        </MenuItem>)*/}
                {/*    })}*/}
                {/*</SubMenu>*/}

                <SubMenu title={strings.nap} icon={<FontAwesomeIcon icon={faThList}/>}>
                    {napsAdmin.map((item, index) => {
                        return (<MenuItem key={index}>
                            <NavLink to={item.path}>
                                {item.label}
                            </NavLink>
                        </MenuItem>)
                    })}
                </SubMenu>

                <SubMenu className={"submenu"} title={strings.nomenclatures} icon={<FontAwesomeIcon icon={faBookmark}/>}>
                    {crudItems.map((item, index) => {
                        return (<MenuItem key={index}>
                            <NavLink to={item.path}>
                                {item.label}
                            </NavLink>
                        </MenuItem>)
                    })}
                </SubMenu>

                <SubMenu className={"submenu"} title={strings.meetings} icon={<FontAwesomeIcon icon={faPhoneSquare}/>}>
                    {meetingsAdmin.map((item, index) => {
                        return (<MenuItem key={index}>
                            <NavLink to={item.path}>
                                {item.label}
                            </NavLink>
                        </MenuItem>)
                    })}
                </SubMenu>

            </>
        }

        // Moderator menu items
        if (this.state.userRole === "ROLE_INSTITUTIONAL_MODERATOR"){
            items=<>
                <SubMenu title={strings.administration} icon={<FontAwesomeIcon icon={faUserCog}/>}>
                    {administrationModerator.map((item, index) => {
                        return (<MenuItem key={index}>
                            <NavLink to={item.path}>
                                {item.label}
                            </NavLink>
                        </MenuItem>)
                    })}
                </SubMenu>

                <SubMenu title={strings.announcement} icon={<FontAwesomeIcon icon={faScroll}/>}>
                    {announcModerator.map((item, index) => {
                        return (<MenuItem key={index}>
                            <NavLink to={item.path}>
                                {item.label}
                            </NavLink>
                        </MenuItem>)
                    })}
                </SubMenu>

                {/*<SubMenu title={strings.questions} icon={<FontAwesomeIcon icon={faQuestion}/>}>*/}
                {/*    {questionsAdmin.map((item, index) => {*/}
                {/*        return (<MenuItem key={index}>*/}
                {/*            <NavLink to={item.path}>*/}
                {/*                {item.label}*/}
                {/*            </NavLink>*/}
                {/*        </MenuItem>)*/}
                {/*    })}*/}
                {/*</SubMenu>*/}

                <SubMenu title={strings.feedbacks} icon={<FontAwesomeIcon icon={faPoll}/>}>
                    {feedbackModerator.map((item, index) => {
                        return (<MenuItem key={index}>
                            <NavLink to={item.path}>
                                {item.label}
                            </NavLink>
                        </MenuItem>)
                    })}
                </SubMenu>

                {/*<SubMenu title={strings.publicDocuments} icon={<FontAwesomeIcon icon={faFileAlt}/>} >*/}
                {/*    {pubDocModerator.map((item, index) => {*/}
                {/*        return (<MenuItem key={index}>*/}
                {/*            <NavLink to={item.path}>*/}
                {/*                {item.label}*/}
                {/*            </NavLink>*/}
                {/*        </MenuItem>)*/}
                {/*    })}*/}
                {/*</SubMenu>*/}

                <SubMenu title={strings.nap} icon={<FontAwesomeIcon icon={faThList}/>}>
                    {napsAdmin.map((item, index) => {
                        return (<MenuItem key={index}>
                            <NavLink to={item.path}>
                                {item.label}
                            </NavLink>
                        </MenuItem>)
                    })}
                </SubMenu>

                <SubMenu className={"submenu"} title={strings.meetings} icon={<FontAwesomeIcon icon={faPhoneSquare}/>}>
                    {meetingsModerator.map((item, index) => {
                        return (<MenuItem key={index}>
                            <NavLink to={item.path}>
                                {item.label}
                            </NavLink>
                        </MenuItem>)
                    })}
                </SubMenu>

                {/*<SubMenu className={"submenu"} title={strings.nomenclatures} icon={<FontAwesomeIcon icon={faBookmark}/>}>*/}
                {/*    {crudItems.map((item, index) => {*/}
                {/*        return (<MenuItem key={index}>*/}
                {/*            <NavLink to={item.path}>*/}
                {/*                {item.label}*/}
                {/*            </NavLink>*/}
                {/*        </MenuItem>)*/}
                {/*    })}*/}
                {/*</SubMenu>*/}
            </>
        }

        if (this.state.userRole === "ROLE_EVALUATOR") {
            items = <>
                <SubMenu title={strings.administration} icon={<FontAwesomeIcon icon={faUserCog}/>}>
                    {administrationModerator.map((item, index) => {
                        return (<MenuItem key={index}>
                            <NavLink to={item.path}>
                                {item.label}
                            </NavLink>
                        </MenuItem>)
                    })}
                </SubMenu>

                <SubMenu title={strings.announcement} icon={<FontAwesomeIcon icon={faScroll}/>}>
                    {announcModerator.map((item, index) => {
                        return (<MenuItem key={index}>
                            <NavLink to={item.path}>
                                {item.label}
                            </NavLink>
                        </MenuItem>)
                    })}
                </SubMenu>

                {/*<SubMenu title={strings.questions} icon={<FontAwesomeIcon icon={faQuestion}/>}>*/}
                {/*    {questionsAdmin.map((item, index) => {*/}
                {/*        return (<MenuItem key={index}>*/}
                {/*            <NavLink to={item.path}>*/}
                {/*                {item.label}*/}
                {/*            </NavLink>*/}
                {/*        </MenuItem>)*/}
                {/*    })}*/}
                {/*</SubMenu>*/}

                <SubMenu title={strings.feedbacks} icon={<FontAwesomeIcon icon={faPoll}/>}>
                    {feedbackModerator.map((item, index) => {
                        return (<MenuItem key={index}>
                            <NavLink to={item.path}>
                                {item.label}
                            </NavLink>
                        </MenuItem>)
                    })}
                </SubMenu>

                {/*<SubMenu title={strings.publicDocuments} icon={<FontAwesomeIcon icon={faFileAlt}/>}>*/}
                {/*    {pubDocModerator.map((item, index) => {*/}
                {/*        return (<MenuItem key={index}>*/}
                {/*            <NavLink to={item.path}>*/}
                {/*                {item.label}*/}
                {/*            </NavLink>*/}
                {/*        </MenuItem>)*/}
                {/*    })}*/}
                {/*</SubMenu>*/}

                {/*<SubMenu title={strings.allReports} icon={<FontAwesomeIcon icon={faFileAlt}/>}>*/}
                {/*    {reportsEvaluator.map((item, index) => {*/}
                {/*        return (<MenuItem key={index}>*/}
                {/*            <NavLink to={item.path}>*/}
                {/*                {item.label}*/}
                {/*            </NavLink>*/}
                {/*        </MenuItem>)*/}
                {/*    })}*/}
                {/*</SubMenu>*/}

                <SubMenu title={strings.nap} icon={<FontAwesomeIcon icon={faThList}/>}>
                    {napsAdmin.map((item, index) => {
                        return (<MenuItem key={index}>
                            <NavLink to={item.path}>
                                {item.label}
                            </NavLink>
                        </MenuItem>)
                    })}
                </SubMenu>

                <SubMenu className={"submenu"} title={strings.meetings} icon={<FontAwesomeIcon icon={faPhoneSquare}/>}>
                    {meetingsEvaluator.map((item, index) => {
                        return (<MenuItem key={index}>
                            <NavLink to={item.path}>
                                {item.label}
                            </NavLink>
                        </MenuItem>)
                    })}
                </SubMenu>

                {/*<SubMenu className={"submenu"} title={strings.nomenclatures} icon={<FontAwesomeIcon icon={faBookmark}/>}>*/}
                {/*    {crudItems.map((item, index) => {*/}
                {/*        return (<MenuItem key={index}>*/}
                {/*            <NavLink to={item.path}>*/}
                {/*                {item.label}*/}
                {/*            </NavLink>*/}
                {/*        </MenuItem>)*/}
                {/*    })}*/}
                {/*</SubMenu>*/}
            </>
        }

        // User menu items
        if (this.state.userRole === "ROLE_USER") {
            items = <>
                <SubMenu title={strings.announcement} icon={<FontAwesomeIcon icon={faScroll}/>}>
                    {announcUser.map((item, index) => {
                        return (<MenuItem key={index}>
                            <NavLink to={item.path}>
                                {item.label}
                            </NavLink>
                        </MenuItem>)
                    })}
                </SubMenu>

                <SubMenu title={strings.feedbacks} icon={<FontAwesomeIcon icon={faPoll}/>}>
                    {feedbackUser.map((item, index) => {
                        return (<MenuItem key={index}>
                            <NavLink to={item.path}>
                                {item.label}
                            </NavLink>
                        </MenuItem>)
                    })}
                </SubMenu>

                {/*<SubMenu title={strings.publicDocuments} icon={<FontAwesomeIcon icon={faFileAlt}/>}>*/}
                {/*    {pubDocUser.map((item, index) => {*/}
                {/*        return (<MenuItem key={index}>*/}
                {/*            <NavLink to={item.path}>*/}
                {/*                {item.label}*/}
                {/*            </NavLink>*/}
                {/*        </MenuItem>)*/}
                {/*    })}*/}
                {/*</SubMenu>*/}
            </>
        }

        return (
            <ProSidebar collapsed={this.props.openSidebar}>
                {/*<SidebarHeader>*/}
                {/*    <div*/}
                {/*        style={{*/}
                {/*            padding: '24px',*/}
                {/*            textTransform: 'uppercase',*/}
                {/*            fontWeight: 'bold',*/}
                {/*            fontSize: 14,*/}
                {/*            letterSpacing: '1px',*/}
                {/*            // overflow: 'hidden',*/}
                {/*            // textOverflow: 'ellipsis',*/}
                {/*            // whiteSpace: 'nowrap',*/}
                {/*            wordWrap: 'brake-word',*/}
                {/*            textAlign: 'center'*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        {strings.agencyName}*/}
                {/*    </div>*/}
                {/*</SidebarHeader>*/}
                <SidebarContent>
                    <Menu iconShape="circle">
                        {items}
                        {/*<MenuItem*/}
                        {/*    icon={<FontAwesomeIcon icon={faPencilAlt}/>}*/}
                        {/*    to='/AnnualReport'*/}
                        {/*>*/}
                        {/*    {strings.annualReport}*/}
                        {/*    <NavLink*/}
                        {/*        to="/AnnualReport"*/}
                        {/*    />*/}
                        {/*</MenuItem >*/}
                    </Menu>
                </SidebarContent>

                <SidebarFooter style={{ textAlign: 'center' }}>

                    {/*THE LOGO*/}
                    {/*<a href="https://dksk.mk/" target="_blank"  rel="noopener noreferrer">*/}
                    {/*    <img src={agencySidebarIcon} className="sidebarLogoImg" alt="agencySidebarIcon" />*/}
                    {/*</a>*/}

                    <div className="sidebar-btn-wrapper" >
                        <NavLink
                            className="sidebar-btn"
                            to={'/FAQ'}
                            style={{height: '50px', width: '200px', padding: '10px 0 10px 0'}}
                            >
                            <div>
                                <div style={{background: "#67C4EF", borderRadius: '14px'}}>
                                    <span style={{color: "black", fontWeight: "bold"}} className="mt-2 mb-2">{strings.faq}</span>
                                </div>
                            </div>
                        </NavLink>
                    </div>

                </SidebarFooter>

            </ProSidebar>
        );
    }
}
export default SidebarMenu;
