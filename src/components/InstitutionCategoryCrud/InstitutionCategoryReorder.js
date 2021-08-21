import React, {Component, useEffect, useState} from "react";
import InstitutionCategoryRepository from "../../repository/InstitutionCategoryRepository";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import {strings} from "../../Localization/Localization";

const finalSpaceCharacters = [
    {
        id: 'gary',
        name: 'Gary Goodspeed',
        thumb: '/images/gary.png'
    },
    {
        id: 'cato',
        name: 'Little Cato',
        thumb: '/images/cato.png'
    },
    {
        id: 'kvn',
        name: 'KVN',
        thumb: '/images/kvn.png'
    },
    {
        id: 'mooncake',
        name: 'Mooncake',
        thumb: '/images/mooncake.png'
    },
    {
        id: 'quinn',
        name: 'Quinn Ergon',
        thumb: '/images/quinn.png'
    }
]

class InstitutionCategoryReorder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        }
    }

    componentWillMount() {
        InstitutionCategoryRepository.getAllInstitutionCategoryList().then( async res => {
            let tmp = [];
            console.log(res.data)
            for(let i = 0; i < res.data.length; i++){
                await tmp.push({id: res.data[i].id, name: localStorage.getItem("activeLanguage") === 'mk' ? res.data[i].nameMk : res.data[i].nameAl, parentCategory: res.data[i].parentCategory})
            }
            this.setState({
                categories: tmp,
            })
        }).catch( err => {
            console.log(err);
        })
    }

    handleOnDragEnd = (result) => {

        debugger

        //destination.index i source.index

        if (!result.destination) return;

        const items = Array.from(this.state.categories);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        let tmp = [];
        for(let i = 0; i < items.length; i++){
            tmp.push(items[i].id)
        }


        InstitutionCategoryRepository.changeCategoriesOrder(tmp.toString()).then( res => {
            // do nothing
        }).catch(err => {
            console.log(err);
        })
        this.setState({
            categories: items,
        });
    }


    render() {
        return (
            <div className="text-center" style={{background: "none", color: "black"}}>
                <header className="text-center" style={{background: "none", color: "black", borderRadius: "5px"}}>
                    <h2>{strings.orderOfInstitutionCategories}</h2>
                    <br/>
                    <DragDropContext onDragEnd={this.handleOnDragEnd}>
                        <Droppable droppableId="categories">
                            {(provided) => (
                                <ol className="categories" {...provided.droppableProps} ref={provided.innerRef}>
                                    {this.state.categories.map(({id, name, parentCategory}, index) => {
                                        console.log(index)
                                        return (
                                            <Draggable key={id} draggableId={'' + id} index={index}>
                                                {(provided) => (
                                                    <li ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >

                                                        <div className="row text-left" style={{fontSize: "14pt", background: "white", margin: "5px", padding: "5px"}}>
                                                            <div className="col-md-6">
                                                                <p>
                                                                    {strings.parentCategory}: {localStorage.getItem("activeLanguage") === 'mk'
                                                                                               ?
                                                                                               parentCategory ? parentCategory.nameMk : strings.hasNot
                                                                                               :
                                                                                               parentCategory ? parentCategory.nameAl : strings.hasNot
                                                                                               }
                                                                </p>
                                                            </div>
                                                            <div className="col-md-6">
                                                                <p>
                                                                    {strings.name}:{ name }
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </li>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </ol>
                            )}
                        </Droppable>
                    </DragDropContext>
                </header>
            </div>
        );
    }
}

export default InstitutionCategoryReorder;