import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useFocusEffect } from 'expo-router'
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { Entypo, EvilIcons, Feather, FontAwesome } from '@expo/vector-icons';

const Jobs = () => {

  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const getData = async () => {
        try {
          const response = await axios.get(`https://testapi.getlokalapp.com/common/jobs?page=1`);

          const obj = response.data.results.map((item) => ({
            title: item?.title,
            company_name: item?.company_name,
            vacancies: item?.job_tags?.[0].value || '',
            img: item?.creatives[0].file,
            salary: item?.primary_details?.Salary,
            btntext: item?.button_text,
            location: item?.job_location_slug,
            category: item?.job_category
          }))
          console.log(obj);
          setData(obj);
        } catch (error) {
          console.log('Error: ', error);
          alert(error);
        }
      }
      getData();
    }, [])
  )
  console.log('DATA: ', data);
  return (
    <SafeAreaView style={styles.safearea}>
      <ScrollView>
        <StatusBar barStyle="light-content" backgroundColor="#151515" />
        <View>
          {data.map((item, index) => {
            return (
              <View key={index} style={styles.maindiv}>
                <View style={styles.flexrow}>
                  <Image style={styles.img} source={{ uri: item.img }} />
                  <View style={styles.flexcol}>
                    <Text style={styles.tb}>{item.company_name}</Text>
                    <Text style={styles.tdiv}>{item.salary}</Text>
                  </View>
                    <Entypo name='share' size={24} color='black' />
                </View>
                <FontAwesome name='building-o' size={24} color='grey'><Text style={styles.small}>{item.category}</Text></FontAwesome>
                <EvilIcons name='location' size={24} color='grey'><Text style={styles.small}>{item.location}</Text></EvilIcons>
                <Text style={styles.greybox}>{item.vacancies}</Text>
                <View style={styles.flexrow}>
                  <TouchableOpacity style={styles.flexrow}>
                    <FontAwesome name='whatsapp' size={24} color='green' />
                    <Text>Chat</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Text>{item.btntext}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Feather name='arrow-right' size={24} color='black' />
                  </TouchableOpacity>

                </View>
              </View>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Jobs

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
    backgroundColor: 'white',
  },
  maindiv: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "",
    marginVertical: 12,
    padding: 12
  },
  tdiv: {
    backgroundColor: "white",
    color: "black"
  },
  tb: {
    backgroundColor: "white",
    color: "black",
    fontWeight: "800"
  },
  small: {
    fontSize: 14
  },
  flexrow: {
    display: "flex",
    flexDirection: "row",
    gap: 20
  },
  flexcol: {
    display: "flex",
    flexDirection: "column"
  },
  greybox: {
    backgroundColor: "grey",
    color: "black",
    padding: 8,
    width: 110,
    borderRadius: 12
  },
  img: {
    height: 50,
    width: 50
  }
})