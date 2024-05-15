import React from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, Text} from 'react-native';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function MainLayout({
  children,
  title = 'First screen',
}: SectionProps): React.JSX.Element {
  return (
    <SafeAreaView>
      <Text>{title}</Text>
      {children}
    </SafeAreaView>
  );
}

export default MainLayout;
