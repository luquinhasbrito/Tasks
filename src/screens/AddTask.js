import React, {Component} from 'react'
import {
    Modal, 
    View, 
    Text,
    StyleSheet, 
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';
import commonStyles from '../commonStyles'

const initialState = { desc: '', date: new Date() }

export default class AddTask extends Component{
    state = {
        ... initialState
    }
    render(){
        return(
            <Modal transparent={true} visible={this.props.isVisible} onRequestClose={this.props.onCancel} animationType='slide'>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.overlay}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Nova Tarefa</Text>
                    <TextInput style={styles.input} placeholder='Informe a Descrição' onChangeText={desc => this.setState({ desc })} value={this.state.desc}/>
                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Close</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.overlay}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.7)',
    },
    container: {
        backgroundColor: '#FFF',
    },
    header:{
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        padding: 8,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 18
    },
    input: {
        padding: 5,
        fontFamily: commonStyles.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#E3E3E3'
    },
    buttons:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        borderTopColor: '#E3E3E3',
        borderTopWidth: 1,
        backgroundColor: '#EEE',
        padding: 5,
    },
    button:{
        padding: 5,
        marginRight: 10,
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontWeight: '600',
        backgroundColor: commonStyles.colors.today
    }
})