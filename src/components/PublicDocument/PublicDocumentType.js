import React, {Component} from "react";
import PublicDocumentTypeRepository from "../../repository/PublicDocumentTypeRepository";
import {strings} from "../../Localization/Localization";
import CrudModal from "../Crud/CrudModal";
import AddPublicDocumentType from "./AddPublicDocumentType";
import {toast} from "react-toastify";
import EditPublicDocumentType from "./EditPublicDocumentType";
import {ButtonToolbar} from "react-bootstrap";
import {faExternalLinkAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./css/PublicDocumentType.css"

class PublicDocumentType extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            publicDocType: null,
            active: "",
            staticLawArticleVisible: false
        }
    }

    componentDidMount() {
        this.getPublicDocTypes();
    }

    getPublicDocTypes = () => {
        PublicDocumentTypeRepository.getAllTypes().then(res => {
            this.setState({data: res.data})
        }).catch(err => console.log(err))
    }

    setPubDoc = (type) => {
        this.setState({
            publicDocType: type,
            active: type.name
        })
    }

    addPubDocType = (entity) => {
        return PublicDocumentTypeRepository.addPubDocType(entity.name).then(() => {
            toast.success(strings.successToAddDocType)
            this.getPublicDocTypes();
        }).catch(() => {
            toast.error(strings.failedToAddDocType)
        })
    }
    editPubDocType = (entity) => {
        return PublicDocumentTypeRepository.editPubDocType(entity).then(() => {
            toast.success(strings.successToEditDocType)
            this.getPublicDocTypes();
        }).catch(() => {
            toast.error(strings.failedToEditDocType)
        })
    }

    staticLawArticleMoreButton = () => {
        this.setState({
            staticLawArticleVisible: !this.state.staticLawArticleVisible
        })
    }

    render() {
        return (
            <div className="container">
                <h2 style={{textAlign: "left", color: "#1C4857"}}
                    className="mt-4 mb-4">{strings.PublicDocumentTypes}</h2>

                <div className="row mt-3 mb-3 staticLawArticleRowDiv">
                    <div className="col-6 staticLawArticleColDiv">
                        <p className="staticLawArticleTitle">Член 10: Посредување на информации</p>
                        {!this.state.staticLawArticleVisible && <button onClick={this.staticLawArticleMoreButton} className="btn btn-danger staticLawArticleMoreButton">
                            {strings.more}...
                        </button>}
                        {this.state.staticLawArticleVisible && <button onClick={this.staticLawArticleMoreButton} className="btn btn-danger staticLawArticleMoreButton">
                            {strings.close}
                        </button>}
                    </div>
                </div>

                {this.state.staticLawArticleVisible && <div>
                    <div className="row mt-3 mb-3 staticLawArticleRowDiv">
                        <div className="col-6 staticLawArticleBodyColDiv">
                            <div className="col-12 text-center">

                                <div className="col-12 pb-3 staticLawArticleTitle">
                                    (1)	Имателот на информации е должен да ја информира јавноста преку својата интернет страница со објавување на:
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Податоците од неговите надлежности кои ги извршува, односно му се утврдени со
                                    закон
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Основните податоци за контакт со имателот на информацијата и тоа: назив, адреса
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Телефонски број, број на факс, е-маил адреса и адресата на интернет страницата
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Податоците за функционерот или одговорното лице кај имателот на информацијата (биографија, податоци за контакт и друго)
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Основните податоци за контакт со службеното лице за посредување со информации и тоа: име и презиме, е-маил адреса и телефонски број
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Основните податоци за контакт со лице овластено за заштитено внатрешно пријавување и тоа: име и презиме, е-маил адреса и телефонски број
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Список на лица вработени кај имателот на информацијата со позиција, службен е- маил и службен телефон
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Законите кои се однесуваат на надлежноста на имателот на информации, поврзани со регистарот на прописи објавени во службеното гласило
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Прописите што во рамките на својата надлежност ги донесува имателот на информацијата во вид на подзаконски акт: правилници (правилник за внатрешна организација, правилник за систематизација на работните места, правилник за заштитено внатрешно пријавување и друго), уредби, наредби, упатства, планови, програми, решенија и други видови акти за извршување на законите и други прописи, кога за тоа се овластени со закон
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Органограм за внатрешна организација
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Стратешки планови и стратегии за работа на имателите на информации
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Годишни планови и програми за работа
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Годишен Буџет и завршна сметка
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Годишни финансиски планови по квартали и програми за реализација на буџетот
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Ревизорски извештај
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Видови услуги кои ги даваат имателите на информации (информации за физичката достапност за остварување на услугите и информации за е-услугите, податоците за законските основи, називот на услугите, документите и податоците потребни за остварување на секоја од услугите, механизмите за правна заштита и други релевантни податоци)
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Тарифници за надоместоци за издавање на реални акти
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Начинот на поднесување на барање за пристап до информации (начин на поднесување усно и писмено барање за пристап до информации, како и барање поднесено по електронски пат)
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Целокупната документација за јавните набавки, за концесиите и за договорите за јавно-приватно партнерство
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Предлог на програми, програми, ставови, мислења, студии и други слични документи кои се однесуваат на актите од надлежноста на имателот на информации соопштенија до јавноста за работи преземени од нивната интернет страница во согласност со законските надлежности, информативни билтени, службени гласила ако се обврска согласно закон и друго
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Извештаи за работа кои ги поднесуваат до органите надлежни за спроведување контрола и надзор
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Статистички податоци за работата, како и други информации, акти и мерки со кои се влијае на животот и работата на граѓаните и кои произлегуваат од надлежноста и работата на имателот на информации
                                </div>

                                <div className="col-12 pt-3 pb-3 staticLawArticleText">
                                    Други информации кои произлегуваат од надлежноста и работата на имателот на информацијата
                                </div>

                                <button onClick={this.staticLawArticleMoreButton} className="btn btn-danger staticLawArticleMoreButton">
                                    {strings.close}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>}

                <div className="row">
                    <CrudModal entity={{}}
                               icon="add"
                               showText={true}
                               btnClass="btn-primary btn-md m-4"
                               title={strings.add}
                               onSubmit={this.addPubDocType}
                               body={AddPublicDocumentType}/>
                </div>
                <div className="row">
                    <div className="col-lg-5 col-md-5 col-sm-5">

                        <div style={{maxHeight: "350px", overflowY: "auto"}}>
                            <ul className="list-group">
                                {this.state.data &&
                                this.state.data.map((type, index) => {
                                    let name = type.name
                                    return (
                                        <li
                                            className={
                                                "list-group-item " +
                                                (name === this.state.active ? "active" : "")
                                            }
                                            key={index}
                                        >
                                            {name.slice(0, 40) + "..."}
                                            <div style={{display: "flex", float: "right"}}>
                                                <button className="btn btn-sm ml-1 "
                                                        style={{"backgroundColor": "#ffe200", "color": "white"}}
                                                        onClick={() => this.setPubDoc(type)}><FontAwesomeIcon
                                                    icon={faExternalLinkAlt}
                                                    style={{paddingRight: '2px'}}/>{strings.open}</button>

                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6">
                        {this.state.publicDocType && (
                            <div className="list-group">
                                <div className="list-group-item">
                                    <div style={{wordWrap: "break-word"}}>
                                        {this.state.publicDocType.name}
                                    </div>
                                    <ButtonToolbar className="mt-3">
                                        <CrudModal entity={this.state.publicDocType}
                                                   icon="edit"
                                                   showText={true}
                                                   btnClass="btn-success btn-sm"
                                                   title={strings.edit}
                                                   onSubmit={this.editPubDocType}
                                                   body={EditPublicDocumentType}/>

                                    </ButtonToolbar>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        )
    }
}

export default PublicDocumentType;
