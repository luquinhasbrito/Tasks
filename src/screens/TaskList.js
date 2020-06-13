import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform, ImageBackground, StyleSheet, FlatList } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyles from '../commonStyles'

import Task from '../components/Task'
import AddTask from './AddTask'

import moment from 'moment'
import 'moment/locale/pt-br'

import todyImage from '../../assets/imgs/today.jpg'

export default class TaskList extends Component {
    state = {
        showDoneTasks: true,
        showAddTask: false,
        visibleTasks: [],
        tasks: [
            {id: Math.random(), desc: "Comprar Livro de React Native", estimateAt: new Date(), doneAt: new Date()},
            {id: Math.random(), desc: "Ler Livro de React Native", estimateAt: new Date(), doneAt: null},
        ]
    }

    componentDidMount = () => {
        this.filterTasks();
    }

    toggleTask = taskId => {
        const tasks = [... this.state.tasks]
        tasks.forEach(task => {
            if(task.id == taskId) task.doneAt = task.doneAt ? null : new Date()
        })
        this.setState({ tasks }, this.filterTasks)
    }

    filterTasks = () => {
        let visibleTasks = null
        if(this.state.showDoneTasks)
            visibleTasks = [... this.state.tasks]
        else {
            const pending = task => task.doneAt === null
            visibleTasks = this.state.tasks.filter(pending)
        }
        this.setState({visibleTasks })
    }

    toogleFilter = () => {
        this.setState({ showDoneTasks: !this.state.showDoneTasks }, this.filterTasks)
    }

    render(){
        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')
        return(
            <View style={styles.container}>
                <AddTask isVisible={this.state.showAddTask} onCancel={() => this.setState({ showAddTask: false })}/>
                <ImageBackground source={todyImage} style={styles.background}>
                    <View style={styles.iconBar}>
                        <TouchableOpacity onPress={this.toogleFilter}>
                            <Icon name={this.state.showDoneTasks ? 'eye' : 'eye-slash'} color={commonStyles.colors.secondary} size={20}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.titleBar}>
                            <Text style={styles.title}>Hoje</Text>
                            <Text style={styles.subTitle}>{today}</Text>
                    </View>
                </ImageBackground>
                <View style={styles.taskList}>
                   <FlatList data={this.state.visibleTasks} keyExtractor={item => `${item.id}`} renderItem={({item}) => <Task {... item} toggleTask={this.toggleTask}/>}/>
                </View>
                <TouchableOpacity onPress={() => this.setState({ showAddTask: true })} style={styles.floatingAction} activeOpacity={0.9}>
                    <Icon name='plus' size={20} color={commonStyles.colors.secondary}/>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 3,
    },
    taskList: {
        flex: 7,
        marginTop: 10
    },
    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    title: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 50,
        color: commonStyles.colors.secondary,
        fontWeight: '600',
        marginLeft: 20,
        marginBottom: 20,
    },
    subTitle: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.secondary,
        fontSize: 17,
        marginLeft: 20,
        marginBottom: 30,
    },
    iconBar: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginHorizontal: 20,
        marginTop: Platform.OS === 'ios' ? 40 : 20
    },
    floatingAction: {
        position: 'absolute',
        bottom: 25,
        right: 25,
        height: 50,
        width: 50,
        backgroundColor: commonStyles.colors.today,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
})