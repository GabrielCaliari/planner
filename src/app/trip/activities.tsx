import React from "react";
import { Text, View } from "react-native";
import { TripData } from "./[id]";


type Props =  {
  tripDetails: TripData
}

export const Activities = ({ tripDetails }: Props) => {
  return (
  <View className="flex-1">
    <Text className="text-white">{tripDetails.destination}</Text>
  </View>
  )
}



export default Activities;
