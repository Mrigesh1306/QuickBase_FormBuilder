import React, { Component } from "react";
import { Card, CardHeader, CardBody, CardDeck } from 'reactstrap';
import ChoiceComp from './ChoiceComp';
import service from '../services/service'
import DisplayChoice from "./DisplayChoice";

class FieldBuilder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            label: "",
            selectType: "singleSelect",
            selectTypeCheckBoxState: false,
            currentSelectedChoice: -1,
            defaultValue: "",
            choices: [],
            result: false,
            ordering: "No ordering"
        }
    }

    labelValidate = (evt) => {
        this.setState({
            label: evt.target.value
        })
    }

    defaultValValidate = (evt) => {
        this.setState({
            defaultValue: evt.target.value
        })
    }

    addChoice = (selectedChoice) => {
        let choiceArray = [...this.state.choices];
        choiceArray.push({ "title": selectedChoice });

        this.setState({
            choices: choiceArray
        })
    }

    isDuplicate = (selectedChoice) => {
        for (let i = 0; i < this.state.choices.length; i++) {
            if (this.state.choices[i].title === selectedChoice) {
                return true;
            }
        }

        return false;
    }

    updateChoice = (index, updatedChoiceTitle, choiceBeforeUpdate) => {
        if (this.isDuplicate(updatedChoiceTitle)) {
            alert("Value already exists.");
            return false;
        } else {

            let newChoiceArray = [...this.state.choices];
            newChoiceArray[index].title = updatedChoiceTitle;

            this.setState({
                choices: newChoiceArray
            })
        }

        if(updatedChoiceTitle.length > 40){
            alert("Choice length greater than 40 characters");
            return false;
        }

        return true;
    }

    deleteChoice = (index) => {
        const x = this.state.choices.slice(0, index);
        const y = this.state.choices.slice(index + 1);
        let newChoicesArray = [...x, ...y];
        this.setState({
            choices: newChoicesArray
        })
    }

    typeValidate = (event) => {
        if (event.target.checked) {
            this.setState({
                selectType: "multiSelect",
                selectTypeCheckBoxState: true
            })
        } else {
            this.setState({
                selectType: "singleSelect",
                selectTypeCheckBoxState: false
            })
        }

    }

    setCurrentSelectedChoice = (index) => {
        this.setState({
            currentSelectedChoice: index
        })
    }

    orderingChangeHandler = (event) => {
        if (this.state.ordering === "alphabetical") {
            this.state.choices.sort((c1, c2) => {
                var c1Title = c1.title.toUpperCase(); 
                var c2Title = c2.title.toUpperCase(); 
                if (c1Title < c2Title) {
                    return 1;
                }
                if (c1 > c2Title) {
                    return -1;
                }
                return 0;
            })
        }

        if (this.state.ordering === "nonAlphabetical") {
            this.state.choices.sort((c1, c2) => {
                var c1Title = c1.title.toUpperCase(); 
                var c2Title = c2.title.toUpperCase(); 
                if (c1Title < c2Title) {
                    return -1;
                }
                if (c1 > c2Title) {
                    return 1;
                }
                return 0;
            })
        }

        this.setState({
            ordering: event.target.value
        })
    }

    displayResult = () => {
        this.setState(state => ({
            result: !state.result
        }))
    }
    render() {
        return (
            <div className={"container-fluid"}>
                <div className={"col-sm-3"}></div>
                <CardDeck>
                    <Card>
                        <CardHeader body style={{ color: 'black', backgroundColor: '#ADD8E6', borderColor: '#ADD8E6' }}><b>FieldBuilder</b></CardHeader>
                        <CardBody>

                            {
                                !this.state.result &&
                                <div className={"row"}>
                                    <div className={"col-sm-3"}></div>
                                    <div className={"col-sm-6"}>
                                        <div className={"row"}>
                                            <div className={"col-sm-2"}><h4>Label</h4></div>
                                            <div className={"col-sm-10"}>
                                                <input className={"form-control"} placeholder={"Sales region"} value={this.state.label} onChange={this.labelValidate} />
                                            </div>
                                        </div>
                                        <br />
                                        <div className={"row"}>
                                            <div className={"col-sm-2"}><h4>Type</h4></div>
                                            <div className={"col-sm-4"}><h5>Multi-select</h5></div>
                                            <div className={"col-sm-1"}>
                                                <input type={"checkbox"} onClick={this.typeValidate} defaultChecked={this.state.selectTypeCheckBoxState} />
                                            </div>
                                            <div className={"col-sm-5"}><h6>A value is required</h6></div>
                                        </div>
                                        <br />
                                        <div className={"row"}>
                                            <div className={"col-sm-6"}><h4>Default Value</h4></div>
                                            <div className={"col-sm-6"}>

                                                <input className={"form-control"} placeholder={"Enter Default choice"} value={this.state.defaultValue} onChange={this.defaultValValidate} />
                                            </div>
                                        </div>
                                        <br />
                                        <div className={"row"}>
                                            <div className={"col-sm-3"}><h4>Choices</h4></div>
                                            <div className={"col-sm-9"}>

                                                {
                                                    this.state.choices.map((choice, index) => {
                                                        let defaultSelection = false;
                                                        if (choice.title === this.state.defaultValue) {
                                                            defaultSelection = true;
                                                        }

                                                        return <ChoiceComp key={index}
                                                            index={index}
                                                            choice={choice}
                                                            updateChoice={this.updateChoice}
                                                            deleteChoice={this.deleteChoice}
                                                            defaultSelection={defaultSelection}
                                                        />
                                                    })
                                                }

                                                <button type={"button"} className={"btn btn-secondary"} onClick={() => {
                                                    if (this.state.choices.length > 50) {
                                                        alert("Choices should be less than 50");
                                                        return;
                                                    }
                                                    this.addChoice("enter Choice")
                                                }}>Add new Choice</button>
                                            </div>
                                        </div>
                                        <br />
                                        <div className={"row"}>
                                            <div className={"col-sm-6"}><h4>Order</h4></div>
                                            <div className={"col-sm-6"}>
                                                <select className={"custom-select"} value={this.state.ordering} onChange={this.orderingChangeHandler}>
                                                    <option value={"noOrdering"}>No ordering</option>
                                                    <option value={"alphabetical"}>Display choice in Alphabetical</option>
                                                    <option value={"nonAlphabetical"}>Display choice in Non - Alphabetical</option>
                                                </select>
                                            </div>
                                        </div>

                                        <br />
                                        <div className={"row"}>
                                            <div className={"col-sm-6"}>
                                                <button style={{ width: "100%" }} type={"button"} className={"btn btn-success"} onClick={() => {
                                                    if (this.state.label !== "" && this.state.label.length !== 0) {
                                                        console.log(this.state);
                                                        service(this.state).then(response => {
                                                            console.log(response);
                                                            alert("Choices are saved!")

                                                        })
                                                    } else {
                                                        alert("Label cannot be empty")
                                                    }
                                                }
                                                }>Save changes</button>
                                            </div>
                                            <div className={"col-sm-6"}>
                                                <button style={{ width: "100%" }} type={"button"} className={"btn btn-info"} onClick={() => {
                                                    this.setState({
                                                        label: "",
                                                        selectType: "singleSelect",
                                                        selectTypeCheckBoxState: false,
                                                        currentSelectedChoice: -1,
                                                        defaultValue: "",
                                                        choices: [],
                                                        result: false,
                                                        ordering: "No ordering"
                                                    })
                                                }}>Reset</button>
                                            </div>
                                        </div>

                                    </div>
                                    <div className={"row"}>
                                        <br></br>
                                    </div>
                                    <div className={"row"}>
                                        <div className={"col-sm-3"}></div>
                                        <div className={"col-sm-3"}>
                                            <button type={"button"} className={"btn btn-danger"} onClick={this.displayResult}>
                                                <label>
                                                    Display result
                                                </label>
                                            </button>
                                        </div>
                                        <div className={"col-sm-3"}></div>
                                        <div className={"col-sm-3"}></div>
                                    </div>
                                </div>

                            }
                            {this.state.result &&
                                <div className={"row"}>
                                    <div className={"col-sm-3"}></div>
                                    <div className={"col-sm-6"}>
                                        <h3>Result</h3>
                                        <hr />
                                        <div className={"row"}>
                                            <div className={"col-sm-2"}><h4>Label:</h4></div>
                                            <div className={"col-sm-10"}><h4>{this.state.label}</h4></div>
                                        </div>


                                        <div className={"row"}>
                                            <div className={"col-sm-6"}><h4>Choices:</h4></div>
                                            <div className={"col-sm-6"}>
                                                {
                                                    this.state.choices.map((choice, index) => {
                                                        let defaultSelection = false;
                                                        if (choice.title === this.state.defaultValue) {
                                                            defaultSelection = true;
                                                        }

                                                        return <DisplayChoice
                                                            choice={choice}
                                                            index={index}
                                                            setCurrentSelectedChoice={this.setCurrentSelectedChoice}
                                                            currentSelectedChoice={this.state.currentSelectedChoice}
                                                            defaultSelection={defaultSelection}
                                                            selectType={this.state.selectType}
                                                            key={index * 987}
                                                        />
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className={"col-sm-3"}></div>
                                
                                    <div className={"row"}>
                                        <div className={"col-sm-3"}></div>
                                        <div className={"col-sm-3"}>
                                            <button type={"button"} className={"btn btn-success"} onClick={this.displayResult}>
                                                <label>
                                                    Go Back
                                                </label>
                                            </button>
                                        </div>
                                        <div className={"col-sm-3"}></div>
                                        <div className={"col-sm-3"}></div>
                                    </div>
                                </div>
                                

                            }

                        </CardBody>
                    </Card>
                </CardDeck>
            </div>
        );
    }
}

export default FieldBuilder;