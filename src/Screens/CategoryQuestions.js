import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import LottieView from "lottie-react-native";
import '../lottie/correctAnimation.json'
import AnimatedView, {ZoomInUp, ZoomOutUp} from "react-native-reanimated";
import CorrectAnimation from "../lottie/correctAnimation";
import { SimpleAnimation } from 'react-native-simple-animations';

const CategoryQuestions = ({navigation, route}) => {

    const {id} = route.params
    const [listQuestion, setListQuestion] = useState([])
    const [index, setIndex] = useState(0)
    const answers = []
    const results = []
    const [pressed, setPressed] = useState(false)
    const colors = ['red', 'green', 'white']
    const [baseColor, setBaseColor] = useState(colors[2])
    const [autoplay, setAutoplay] = useState(false)

    const getCategoryQuestions = async () => {
        const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${id}&difficulty=easy&type=multiple`);
        const data = await response.json();
        return data.results;
    }

    useEffect(() => {
        getCategoryQuestions().then(setListQuestion)
    }, [])

    if (!listQuestion.length) {
        return null
    }

    const NextQuestion = () => {
        setPressed(true)
        setAutoplay(true)
        setIndex(index => index + 1)
    }

    const generateRandomNumber = () => {
        const nRands = [0, 1, 2, 3]

        for (let i = 0; i < nRands.length; i++) {
            const random = Math.floor(Math.random() * (3 - i))
            results.push(nRands[random])
            nRands[random] = nRands[3 - i]
        }
    }

    const addElements = () => {
        answers.push(listQuestion[index].correct_answer)
        for (let i = 0; i < 3; i++) {
            answers.push(listQuestion[index].incorrect_answers[i])
        }
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'rgb(100, 79, 209)'}}>
            <View style={{flex: 1}}>
                <View style={{alignItems: 'center', marginRight: 10, marginLeft: 10, marginTop: 10}}>
                    {index == 10 ? <View style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <SimpleAnimation delay={500} duration={1000} fade={true} staticType='zoom'>
                        <TouchableOpacity
                            style={{
                                backgroundColor: 'green',
                                paddingVertical: 10,
                                paddingHorizontal: 30,
                                borderRadius: 20,
                                borderColor: 'black',
                                borderWidth: 1
                            }}
                            onPress={() => {
                                navigation.navigate('Categories')
                            }
                            }>
                            <Text style={{fontSize: 30}}>Return to categories</Text>
                        </TouchableOpacity>
                        </SimpleAnimation>
                        <Text style={{marginTop: 50, fontSize: 20}}>Good Game!</Text>
                    </View> : <View>
                        {addElements()}
                        {generateRandomNumber()}
                        <Text
                            style={styles.question}>{listQuestion[index].question.replace('S&#039;', '\'').replace('&oacute;', 'o').replace('&#039;', '\'').replace('&quot;', ' ')}</Text>
                        <View style={{justifyContent: 'flex-end'}}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                width: '100%',
                                // marginTop: 30
                            }}>
                                <TouchableOpacity
                                    onPress={NextQuestion}
                                    style={{
                                        width: '40%',
                                        height: '60%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: baseColor,
                                        borderRadius: 20
                                    }}>
                                    <View style={styles.firstCircle}>
                                        <Text style={{fontSize: 25, fontStyle: 'bold', color: 'white'}}>A</Text>
                                    </View>
                                    <Text style={styles.response}>{answers[results[0]]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={NextQuestion}
                                    style={{
                                        width: '40%',
                                        height: '60%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: baseColor,
                                        borderRadius: 20
                                    }}>
                                    <View style={styles.secondCircle}>
                                        <Text style={{fontSize: 25, fontStyle: 'bold', color: 'white'}}>B</Text>
                                    </View>
                                    <Text style={styles.response}>{answers[results[1]]}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
                                <TouchableOpacity
                                    onPress={NextQuestion}
                                    style={{
                                        width: '40%',
                                        height: '60%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: baseColor,
                                        borderRadius: 20
                                    }}>
                                    <View style={styles.thirdCircle}>
                                        <Text style={{fontSize: 25, fontStyle: 'bold', color: 'white'}}>C</Text>
                                    </View>
                                    <Text style={styles.response}>{answers[results[2]]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={NextQuestion}
                                    style={{
                                        width: '40%',
                                        height: '60%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: baseColor,
                                        borderRadius: 20
                                    }}>
                                    <View style={styles.fourthCircle}>
                                        <Text style={{fontSize: 25, fontStyle: 'bold', color: 'white'}}>D</Text>
                                    </View>
                                    <Text style={styles.response}>{answers[results[3]]}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{alignItems: 'center'}}>
                                <CorrectAnimation
                                pressed={pressed}
                                source={require('../lottie/correctAnimation.json')}
                                autoplay={autoplay}
                                style={{width: 100, height: 100}}
                                />
                            </View>
                        </View>
                    </View>
                    }
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    answers: {
        width: '40%',
        height: '60%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 20
    },
    response: {
        fontSize: 20,
        fontFamily: 'Inter_900Black',
        textAlign: 'center',
        paddingRight: 5,
        paddingLeft: 5
    },
    question: {
        fontSize: 23,
        fontFamily: 'Inter_900Black',
        textAlign: 'center',
        color: 'white',
        paddingLeft: 20,
        paddingRight: 20
    },
    firstCircle: {
        marginBottom: 20,
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'yellow',
        alignItems: 'center',
        justifyContent: 'center'
    },
    secondCircle: {
        marginBottom: 20,
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'blue',
        alignItems: 'center',
        justifyContent: 'center'
    },
    thirdCircle: {
        marginBottom: 20,
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center'
    },
    fourthCircle: {
        marginBottom: 20,
        width: 50,
        height: 50,
        borderRadius: 50,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default CategoryQuestions;