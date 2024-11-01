import axios from 'axios';
import { evaluate } from 'mathjs';
import React, { useState } from 'react';
import { BlockMath } from 'react-katex';
import NAvbar from './Navbar';

function Divided() {
    const [selectOrder, setSelectOrder] = useState("")
    const [selectError, setselectError] = useState("")
    const [selectdirection, setSelectDirection] = useState("")
    const [Equation, setEquation] = useState("")
    const [inputX, setinputX] = useState(null)
    const [inputH, setinputH] = useState(null)
    const [Steps, setSteps] = useState([])

    const fetchRandomEquation = async () => {
        try {
            const response = await axios.get('http://localhost:3002/diff/diffeq')
            if (response.data.result) {
                const equation = response.data.data
                const randomIndex = Math.floor(Math.random() * equation.length)
                const randomEquation = equation[randomIndex].equationdiff
                setEquation(randomEquation)
                setinputX("")
                setSelectOrder("")
                setselectError("")
                setSelectDirection("")
                setinputH("")
                setSteps([])
            }
        } catch (error) {
            console.error("Error fetching random equation", error)
        }
    }


    const inputXX = (event) => {
        setinputX(parseFloat(event.target.value))
    }

    const inputHH = (event) => {
        setinputH(parseFloat(event.target.value))
    }

    const inputEquation = (event) => {
        setEquation(event.target.value)
    }

    const caldifferent = () => {
        const f = (x) => {
            return evaluate(Equation, { x })
        }
        const StepsArray = [];
        if (selectOrder === "First") {
            if (selectError === "O(h)") {
                if (selectdirection === "Forward") { // first 1

                    const result = (f(Number(inputX) + Number(inputH)) - f(Number(inputX))) / Number(inputH)
                    console.log(result)
                    StepsArray.push(`{f'(x)} = \\frac{f(x_i + 1) - f(x)}{h}`)
                    StepsArray.push(`{f'(${inputX})} = \\frac{f(${inputX} + ${inputH}) - f(${inputX})}{${inputH}}`)
                    StepsArray.push(`f'(${inputX}) =  ${result}`)
                    setSteps(StepsArray)

                } else if (selectdirection === "Backward") {

                    const result = (f(Number(inputX)) - f(Number(inputX) - Number(inputH))) / Number(inputH)
                    console.log(result)
                    StepsArray.push(`f'(x) = \\frac{f(x + h) - f(x)}{h}`);
                    StepsArray.push(`f'(${inputX}) = \\frac{f(${inputX} + ${inputH}) - f(${inputX})}{${inputH}}`);
                    StepsArray.push(`f'(${inputX}) = ${result}`);
                    setSteps(StepsArray)

                } else if (selectdirection === "Centered") {

                    const result = (f(Number(inputX) + Number(inputH)) - f(Number(inputX) - Number(inputH))) / (2 * (Number(inputH)))
                    console.log(result)
                    StepsArray.push(`f'(x) = \\frac{f(x + h) - f(x - h)}{2h}`);
                    StepsArray.push(`f'(${inputX}) = \\frac{f(${inputX} + ${inputH}) - f(${inputX} - ${inputH})}{2(${inputH})}`);
                    StepsArray.push(`f'(${inputX}) = ${result}`);
                    setSteps(StepsArray)

                }
            } else if (selectError === "O(h^2)") { // first 2
                if (selectdirection === "Forward") {

                    const result = (-f(Number(inputX) + 2 * Number(inputH)) + (4 * f(Number(inputX) + Number(inputH))) - (3 * f(Number(inputX)))) / (2 * (Number(inputH)))
                    console.log(result)
                    StepsArray.push(`f'(x) = \\frac{-f(x + 2h) + 4f(x + h) - 3f(x)}{2h}`);
                    StepsArray.push(`f'(${inputX}) = \\frac{-f(${inputX} + 2${inputH}) + 4f(${inputX} + ${inputH}) - 3f(${inputX})}{2(${inputH})}`);
                    StepsArray.push(`f'(${inputX}) = ${result}`);
                    setSteps(StepsArray)

                } else if (selectdirection === "Backward") {

                    const result = ((3 * f(Number(inputX))) - (4 * f(Number(inputX) - Number(inputH))) + f(Number(inputX) - 2 * Number(inputH))) / (2 * (Number(inputH)))
                    console.log(result)
                    StepsArray.push(`f'(x) = \\frac{3f(x) - 4f(x - h) + f(x - 2h)}{2h}`);
                    StepsArray.push(`f'(${inputX}) = \\frac{3f(${inputX}) - 4f(${inputX} - ${inputH}) + f(${inputX} - 2${inputH})}{2(${inputH})}`);
                    StepsArray.push(`f'(${inputX}) = ${result}`);
                    setSteps(StepsArray)

                } else if (selectdirection === "Centered") {

                    const result = ((-f(Number(inputX) + 2 * Number(inputH))) + (8 * f(Number(inputX) + Number(inputH))) - (8 * f(Number(inputX) - Number(inputH))) + f(Number(inputX) - 2 * Number(inputH))) / (12 * (Number(inputH)))
                    console.log(result)
                    StepsArray.push(`f'(x) = \\frac{-f(x + 2h) + 8f(x + h) - 8f(x - h) + f(x - 2h)}{12h}`);
                    StepsArray.push(`f'(${inputX}) = \\frac{-f(${inputX} + 2(${inputH})) + 8f(${inputX} + ${inputH}) - 8f(${inputX} - ${inputH}) + f(${inputX} - 2(${inputH}))}{12(${inputH})}`);
                    StepsArray.push(`f'(${inputX}) = ${result}`);
                    setSteps(StepsArray)

                }
            } else if (selectError === "O(h^4)") { // first 4
                if (selectdirection === "Forward") {

                    const result = (
                        (-2 * f(Number(inputX) + 5 * Number(inputH))) +
                        (11 * f(Number(inputX) + 4 * Number(inputH))) -
                        (24 * f(Number(inputX) + 3 * Number(inputH))) +
                        (26 * f(Number(inputX) + 2 * Number(inputH))) -
                        (14 * f(Number(inputX) + Number(inputH))) +
                        (3 * f(Number(inputX)))
                    ) / Math.pow(Number(inputH), 4);
                    console.log(result)
                    StepsArray.push(`f'(x) = \\frac{-2f(x + 5h) + 11f(x + 4h) - 24f(x + 3h) + 26f(x + 2h) - 14f(x + h) + 3f(x)}{h^4}`);
                    StepsArray.push(`f'(${inputX}) = \\frac{-2f(${inputX} + 5(${inputH})) + 11f(${inputX} + 4(${inputH})) - 24f(${inputX} + 3(${inputH})) + 26f(${inputX} + 2(${inputH})) - 14f(${inputX} + ${inputH}) + 3f(${inputX})}{(${inputH})^4}`);
                    StepsArray.push(`f'(${inputX}) = ${result}`);

                    setSteps(StepsArray)

                } else if (selectdirection === "Backward") {

                    const result = (
                        (3 * f(Number(inputX))) -
                        (14 * f(Number(inputX) - Number(inputH))) +
                        (26 * f(Number(inputX) - 2 * Number(inputH))) -
                        (24 * f(Number(inputX) - 3 * Number(inputH))) +
                        (11 * f(Number(inputX) - 4 * Number(inputH))) -
                        (2 * f(Number(inputX) - 5 * Number(inputH)))
                    ) / Math.pow(Number(inputH), 4);
                    console.log(result)
                    StepsArray.push(`f'(x) = \\frac{3f(x) - 14f(x - h) + 26f(x - 2h) - 24f(x - 3h) + 11f(x - 4h) - 2f(x - 5h)}{h^4}`);
                    StepsArray.push(`f'(${inputX}) = \\frac{3f(${inputX}) - 14f(${inputX} - ${inputH}) + 26f(${inputX} - 2(${inputH})) - 24f(${inputX} - 3(${inputH})) + 11f(${inputX} - 4(${inputH})) - 2f(${inputX} - 5(${inputH}))}{(${inputH})^4}`);
                    StepsArray.push(`f'(${inputX}) = ${result}`);

                    setSteps(StepsArray)

                } else if (selectdirection === "Centered") {

                    const result = (
                        (-f(Number(inputX) + 3 * Number(inputH))) +
                        (12 * f(Number(inputX) + 2 * Number(inputH))) -
                        (39 * f(Number(inputX) + Number(inputH))) +
                        (56 * f(Number(inputX))) -
                        (39 * f(Number(inputX) - Number(inputH))) +
                        (12 * f(Number(inputX) - 2 * Number(inputH))) +
                        (-f(Number(inputX) - 3 * Number(inputH)))

                    ) / (6 * Math.pow(Number(inputH), 4))
                    console.log(result)
                    StepsArray.push(`f'(x) = \\frac{-f(x + 3h) + 12f(x + 2h) - 39f(x + h) + 56f(x) - 39f(x - h) + 12f(x - 2h) - f(x - 3h)}{6h^4}`);
                    StepsArray.push(`f'(${inputX}) = \\frac{-f(${inputX} + 3(${inputH})) + 12f(${inputX} + 2(${inputH})) - 39f(${inputX} + ${inputH}) + 56f(${inputX}) - 39f(${inputX} - ${inputH}) + 12f(${inputX} - 2(${inputH})) - f(${inputX} - 3(${inputH}))}{6(${inputH})^4}`);
                    StepsArray.push(`f'(${inputX}) = ${result}`)

                    setSteps(StepsArray)

                }
            }

        } else if (selectOrder === "Second") { // second 1
            if (selectError === "O(h)") {
                if (selectdirection === "Forward") {

                    const result = (
                        (f(Number(inputX) + 2 * Number(inputH))) -
                        (2 * f(Number(inputX) + Number(inputH))) +
                        (f(Number(inputX)))
                    ) / Math.pow(Number(inputH), 2)
                    console.log(result)
                    StepsArray.push(`f'(x) = \\frac{f(x + 2h) - 2f(x + h) + f(x)}{h^2}`);
                    StepsArray.push(`f'(${inputX}) = \\frac{f(${inputX} + 2(${inputH})) - 2f(${inputX} + (${inputH})) + f(${inputX})}{(${inputH})^2}`);
                    StepsArray.push(`f'(${inputX}) = ${result}`)

                    setSteps(StepsArray)

                } else if (selectdirection === "Backward") {

                    const result = (
                        (f(Number(inputX))) -
                        (2 * f(Number(inputX) - Number(inputH))) +
                        (f(Number(inputX) - 2 * Number(inputH)))
                    ) / Math.pow(Number(inputH), 2)
                    console.log(result)
                    StepsArray.push(`f'(x) = \\frac{f(x) - 2f(x - h) + f(x - 2h)}{h^2}`);
                    StepsArray.push(`f'(${inputX}) = \\frac{f(${inputX}) - 2f(${inputX} - (${inputH})) + f(${inputX} - 2(${inputH}))}{(${inputH})^2}`);
                    StepsArray.push(`f'(${inputX}) = ${result}`)

                    setSteps(StepsArray)

                } else if (selectdirection === "Centered") {

                    const result = (
                        (f(Number(inputX) + Number(inputH))) -
                        (2 * f(Number(inputX))) +
                        (f(Number(inputX) - Number(inputH)))
                    ) / Math.pow(Number(inputH), 2)
                    console.log(result)
                    StepsArray.push(`f'(x) = \\frac{f(x + h) - 2f(x) + f(x - h)}{h^2}`);
                    StepsArray.push(`f'(${inputX}) = \\frac{f(${inputX} + ${inputH}) - 2f(${inputX}) + f(${inputX} - ${inputH})}{(${inputH})^2}`);
                    StepsArray.push(`f'(${inputX}) = ${result}`)

                    setSteps(StepsArray)

                }
            } else if (selectError === "O(h^2)") {
                if (selectdirection === "Forward") {

                    const result = (
                        (-f(Number(inputX) + 3 * Number(inputH))) +
                        (4 * f(Number(inputX) + 2 * Number(inputH))) -
                        (5 * f(Number(inputX) + Number(inputH))) +
                        (2 * f(Number(inputX)))
                    ) / Math.pow(Number(inputH), 2)
                    console.log(result)
                    StepsArray.push(`f'(x) = \\frac{-f(x + 3h) + 4f(x + 2h) - 5f(x + h) + 2f(x)}{h^2}`);
                    StepsArray.push(`f'(${inputX}) = \\frac{-f(${inputX} + 3(${inputH})) + 4f(${inputX} + 2(${inputH})) - 5f(${inputX} + (${inputH})) + 2f(${inputX})}{(${inputH})^2}`);
                    StepsArray.push(`f'(${inputX}) = ${result}`)

                    setSteps(StepsArray)

                } else if (selectdirection === "Backward") {

                    const result = (
                        (2 * f(Number(inputX))) -
                        (5 * f(Number(inputX) - Number(inputH))) +
                        (4 * f(Number(inputX) - 2 * Number(inputH))) -
                        (f(Number(inputX) - 3 * Number(inputH)))
                    ) / Math.pow(Number(inputH), 2)
                    console.log(result)
                    StepsArray.push(`f'(x) = \\frac{2f(x) - 5f(x - h) + 4f(x - 2h) - f(x - 3h)}{h^2}`);
                    StepsArray.push(`f'(${inputX}) = \\frac{2f(${inputX}) - 5f(${inputX} - ${inputH}) + 4f(${inputX} - 2(${inputH})) - f(${inputX} - 3(${inputH}))}{(${inputH})^2}`);
                    StepsArray.push(`f'(${inputX}) = ${result}`)

                    setSteps(StepsArray)

                } else if (selectdirection === "Centered") {

                    const result = (
                        (f(Number(inputX) + Number(inputH))) -
                        (2 * f(Number(inputX))) +
                        (f(Number(inputX) - Number(inputH)))
                    ) / Math.pow(Number(inputH), 2)
                    console.log(result)
                    StepsArray.push(`f'(x) = \\frac{f(x + h) - 2f(x) + f(x - h)}{h^2}`);
                    StepsArray.push(`f'(${inputX}) = \\frac{f(${inputX} + ${inputH}) - 2f(${inputX}) + f(${inputX} - ${inputH})}{(${inputH})^2}`);
                    StepsArray.push(`f'(${inputX}) = ${result}`)
                    setSteps(StepsArray)

                }
            } else if (selectError === "O(h^4)") {
                if (selectdirection === "Forward") {

                    const result = (
                        (f(Number(inputX) + 4 * Number(inputH))) -
                        (4 * f(Number(inputX) + 3 * Number(inputH))) +
                        (6 * f(Number(inputX) + 2 * Number(inputH))) -
                        (4 * f(Number(inputX) + Number(inputH))) +
                        (f(Number(inputX)))
                    ) / Math.pow(Number(inputH), 4);
                    console.log(result);
                    StepsArray.push(`f'(x) = \\frac{f(x + 4h) - 4f(x + 3h) + 6f(x + 2h) - 4f(x + h) + f(x)}{h^4}`);
                    StepsArray.push(`f'(${inputX}) = \\frac{f(${inputX} + 4 \\cdot ${inputH}) - 4f(${inputX} + 3 \\cdot ${inputH}) + 6f(${inputX} + 2 \\cdot ${inputH}) - 4f(${inputX} + ${inputH}) + f(${inputX})}{(${inputH})^4}`);
                    StepsArray.push(`f'(${inputX}) = ${result}`)
                    setSteps(StepsArray)

                } else if (selectdirection === "Backward") { ///**************** */

                    const result = (
                        (f(Number(inputX))) -
                        (4 * f(Number(inputX) - Number(inputH))) +
                        (6 * f(Number(inputX) - 2 * Number(inputH))) -
                        (4 * f(Number(inputX) - 3 * Number(inputH))) +
                        (f(Number(inputX) - 4 * Number(inputH)))
                    ) / Math.pow(Number(inputH), 4);
                    console.log(result);
                    StepsArray.push(`f^{(4)}(x) = \\frac{f(x) - 4f(x - h) + 6f(x - 2h) - 4f(x - 3h) + f(x - 4h)}{h^4}`);
                    StepsArray.push(`f^{(4)}(${inputX}) = \\frac{f(${inputX}) - 4f(${inputX} - ${inputH}) + 6f(${inputX} - 2 \\cdot ${inputH}) - 4f(${inputX} - 3 \\cdot ${inputH}) + f(${inputX} - 4 \\cdot ${inputH})}{(${inputH})^4}`);
                    StepsArray.push(`f^{(4)}(${inputX}) = ${result}`)
                    setSteps(StepsArray)

                } else if (selectdirection === "Centered") {

                    const result = (
                        (f(Number(inputX) + 2 * Number(inputH))) -
                        (2 * f(Number(inputX))) +
                        (f(Number(inputX) - 2 * Number(inputH)))
                    ) / Math.pow(Number(inputH), 4);
                    console.log(result);
                    StepsArray.push(`f'(x) = \\frac{f(x + 2h) - 2f(x) + f(x - 2h)}{h^4}`);
                    StepsArray.push(`f'(${inputX}) = \\frac{f(${inputX} + 2 \\cdot ${inputH}) - 2f(${inputX}) + f(${inputX} - 2 \\cdot ${inputH})}{(${inputH})^4}`);
                    StepsArray.push(`f'(${inputX}) = ${result}`)
                    setSteps(StepsArray)
                }
            }
        }
        // else if (selectOrder === "Third") {
        //     if (selectError === "O(h)") {
        //         if (selectdirection === "Forward") {
        //             const result = (
        //                 (f(Number(inputX) + 3 * Number(inputH))) -
        //                 (3 * f(Number(inputX) + 2 * Number(inputH))) +
        //                 (3 * f(Number(inputX) + Number(inputH))) -
        //                 (f(Number(inputX)))
        //             ) / (Number(inputH));
        //             console.log(result);
        //         } else if (selectdirection === "Backward") {
        //             const result = (
        //                 (f(Number(inputX))) -
        //                 (3 * f(Number(inputX) - Number(inputH))) +
        //                 (3 * f(Number(inputX) - 2 * Number(inputH))) -
        //                 (f(Number(inputX) - 3 * Number(inputH)))
        //             ) / (Number(inputH));
        //             console.log(result);
        //         } else if (selectdirection === "Centered") {
        //             const result = (
        //                 (f(Number(inputX) + Number(inputH))) -
        //                 (f(Number(inputX) - Number(inputH)))
        //             ) / (2 * Number(inputH));
        //             console.log(result);
        //         }
        //     } else if (selectError === "O(h^2)") {
        //         if (selectdirection === "Forward") {
        //             const result = (
        //                 (-f(Number(inputX) + 2 * Number(inputH))) +
        //                 (4 * f(Number(inputX) + Number(inputH))) -
        //                 (3 * f(Number(inputX)))
        //             ) / (Number(inputH));
        //             console.log(result);
        //         } else if (selectdirection === "Backward") {
        //             const result = (
        //                 (3 * f(Number(inputX))) -
        //                 (4 * f(Number(inputX) - Number(inputH))) +
        //                 (f(Number(inputX) - 2 * Number(inputH)))
        //             ) / (Number(inputH));
        //             console.log(result);
        //         } else if (selectdirection === "Centered") {
        //             const result = (
        //                 (f(Number(inputX) + Number(inputH))) -
        //                 (f(Number(inputX) - Number(inputH)))
        //             ) / (2 * Number(inputH));
        //             console.log(result);
        //         }
        //     } else if (selectError === "O(h^4)") {
        //         if (selectdirection === "Forward") {
        //             const result = (
        //                 (f(Number(inputX) + 4 * Number(inputH))) -
        //                 (4 * f(Number(inputX) + 3 * Number(inputH))) +
        //                 (6 * f(Number(inputX) + 2 * Number(inputH))) -
        //                 (4 * f(Number(inputX) + Number(inputH))) +
        //                 (f(Number(inputX)))
        //             ) / Math.pow(Number(inputH), 4);
        //             console.log(result);
        //         } else if (selectdirection === "Backward") {
        //             const result = (
        //                 (f(Number(inputX))) -
        //                 (4 * f(Number(inputX) - Number(inputH))) +
        //                 (6 * f(Number(inputX) - 2 * Number(inputH))) -
        //                 (4 * f(Number(inputX) - 3 * Number(inputH))) +
        //                 (f(Number(inputX) - 4 * Number(inputH)))
        //             ) / Math.pow(Number(inputH), 4);
        //             console.log(result);
        //         } else if (selectdirection === "Centered") {
        //             const result = (
        //                 (f(Number(inputX) + 2 * Number(inputH))) -
        //                 (2 * f(Number(inputX))) +
        //                 (f(Number(inputX) - 2 * Number(inputH)))
        //             ) / Math.pow(Number(inputH), 4);
        //             console.log(result);
        //         }
        //     }
        // } else if (selectOrder === "Fourth") {
        //     if (selectError === "O(h)") {
        //         if (selectdirection === "Forward") {

        //             const result = (
        //                 (f(Number(inputX) + 4 * Number(inputH))) -
        //                 (4 * f(Number(inputX) + 3 * Number(inputH))) +
        //                 (6 * f(Number(inputX) + 2 * Number(inputH))) -
        //                 (4 * f(Number(inputX) + Number(inputH))) +
        //                 (f(Number(inputX)))
        //             ) / (Number(inputH));
        //             console.log(result);

        //         } else if (selectdirection === "Backward") {

        //             const result = (
        //                 (f(Number(inputX))) -
        //                 (4 * f(Number(inputX) - Number(inputH))) +
        //                 (6 * f(Number(inputX) - 2 * Number(inputH))) -
        //                 (4 * f(Number(inputX) - 3 * Number(inputH))) +
        //                 (f(Number(inputX) - 4 * Number(inputH)))
        //             ) / (Number(inputH));
        //             console.log(result);

        //         } else if (selectdirection === "Centered") {

        //             const result = (
        //                 (f(Number(inputX) + Number(inputH))) -
        //                 (f(Number(inputX) - Number(inputH)))
        //             ) / (2 * Number(inputH));
        //             console.log(result);
        //         }
        //     } else if (selectError === "O(h^2)") {

        //         if (selectdirection === "Forward") {
        //             const result = (
        //                 (f(Number(inputX) + 4 * Number(inputH))) -
        //                 (4 * f(Number(inputX) + 3 * Number(inputH))) +
        //                 (6 * f(Number(inputX) + 2 * Number(inputH))) -
        //                 (4 * f(Number(inputX) + Number(inputH))) +
        //                 (f(Number(inputX)))
        //             ) / Math.pow(Number(inputH), 2);
        //             console.log(result);

        //         } else if (selectdirection === "Backward") {

        //             const result = (
        //                 (f(Number(inputX))) -
        //                 (4 * f(Number(inputX) - Number(inputH))) +
        //                 (6 * f(Number(inputX) - 2 * Number(inputH))) -
        //                 (4 * f(Number(inputX) - 3 * Number(inputH))) +
        //                 (f(Number(inputX) - 4 * Number(inputH)))
        //             ) / Math.pow(Number(inputH), 2);
        //             console.log(result);

        //         } else if (selectdirection === "Centered") {

        //             const result = (
        //                 (f(Number(inputX) + 2 * Number(inputH))) -
        //                 (2 * f(Number(inputX))) +
        //                 (f(Number(inputX) - 2 * Number(inputH)))
        //             ) / Math.pow(Number(inputH), 2);
        //             console.log(result);
        //         }

        //     } else if (selectError === "O(h^4)") {

        //         if (selectdirection === "Forward") {
        //             const result = (
        //                 (f(Number(inputX) + 4 * Number(inputH))) -
        //                 (4 * f(Number(inputX) + 3 * Number(inputH))) +
        //                 (6 * f(Number(inputX) + 2 * Number(inputH))) -
        //                 (4 * f(Number(inputX) + Number(inputH))) +
        //                 (f(Number(inputX)))
        //             ) / Math.pow(Number(inputH), 4);
        //             console.log(result);

        //         } else if (selectdirection === "Backward") {

        //             const result = (
        //                 (f(Number(inputX))) -
        //                 (4 * f(Number(inputX) - Number(inputH))) +
        //                 (6 * f(Number(inputX) - 2 * Number(inputH))) -
        //                 (4 * f(Number(inputX) - 3 * Number(inputH))) +
        //                 (f(Number(inputX) - 4 * Number(inputH)))
        //             ) / Math.pow(Number(inputH), 4);
        //             console.log(result);

        //         } else if (selectdirection === "Centered") {
        //             const result = (
        //                 (f(Number(inputX) + 2 * Number(inputH))) -
        //                 (2 * f(Number(inputX))) +
        //                 (f(Number(inputX) - 2 * Number(inputH)))
        //             ) / Math.pow(Number(inputH), 4);
        //             console.log(result);
        //         }
        //     }
        // }
    }

    return (
        <>
            <NAvbar />
            <div>
                <div className='container112'>
                    <div className='headbi1'>
                        <h1>Differentiation</h1>
                    </div>
                    <div className='inputxlbi'>
                        <div className='input-group'>
                            <div className='input-item'>
                                <label>Order : </label>
                                <select value={selectOrder} onChange={(e) => setSelectOrder(e.target.value)}>
                                    <option value="">Select Order</option>
                                    <option value="First">First</option>
                                    <option value="Second">Second</option>
                                    {/* <option value="Second">Third</option> */}
                                    {/* <option value="Second">Fourth</option> */}
                                </select>
                            </div>
                            <div className='input-item'>
                                <label>Error : </label>
                                <select value={selectError} onChange={(e) => setselectError(e.target.value)}>
                                    <option value="">Select Error</option>
                                    <option value="O(h)">O(h)</option>
                                    <option value="O(h^2)">O(h^2)</option>
                                    <option value="O(h^4)">O(h^4)</option>
                                </select>
                            </div>
                            <div className='input-item'>
                                <label>Direction : </label>
                                <select value={selectdirection} onChange={(e) => setSelectDirection(e.target.value)}>
                                    <option value="">Select Direction</option>
                                    <option value="Forward">Forward</option>
                                    <option value="Backward">Backward</option>
                                    <option value="Centered">Centered</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className='inputEquationbi'>
                        <div className='P'>
                            <p>F(x): {Equation}</p>
                        </div>
                        <div className='input1'>
                            <input
                                type="text"
                                value={Equation}
                                onChange={inputEquation}
                                placeholder="Enter an equation"
                            />
                        </div>
                    </div>
                    <div className='inputxlbi'>
                        <div className='input-group'>
                            <div className='input-item'>
                                <label>X : </label>
                                <input
                                    type="number"
                                    value={inputX}
                                    onChange={inputXX}
                                    placeholder="2"
                                />
                            </div>
                            <div className='input-item'>
                                <label>h : </label>
                                <input
                                    type="number"
                                    value={inputH}
                                    onChange={inputHH}
                                    placeholder="0.25"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='calbi'>
                        <button className="btn btn-sm btn-warning" onClick={fetchRandomEquation}>
                            Random
                        </button>
                        <button className="btn btn-neutral btn-sm" onClick={caldifferent}>
                            Calculate
                        </button>
                    </div>
                </div>
                {Steps.length > 0 && (
                    <div className='table-container'>
                        {Steps.map((step, idx) => (
                            <div key={idx} className='calculation-step'>
                                <BlockMath key={idx} math={step} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </>
    )
}

export default Divided
