import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  SafeAreaView,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import DemoButton from './src/components/demoButton';

import {ShallowCopyExamples} from './src/examples/shallowCopyExamples';
import {DeepCopyExamples} from './src/examples/deepCopyExamples';
import {ComparisonExamples} from './src/examples/comparisonExamples';
import {FlatteningExample} from './src/examples/flatteningExample';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [output, setOutput] = useState('Tap buttons to see examples...');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const textStyle = {
    color: isDarkMode ? Colors.white : Colors.black,
  };

  const cardStyle = {
    backgroundColor: isDarkMode ? Colors.dark : Colors.white,
  };

  const logToScreen = (message: string) => {
    setOutput(prev => prev + '\n' + message);
  };

  const clearOutput = () => {
    setOutput('');
  };

  const runShallowCopyExample = () => {
    clearOutput();
    logToScreen('Running Shallow Copy Examples...\n');
    console.log = (message: any) => logToScreen(String(message));

    setTimeout(() => {
      ShallowCopyExamples.basicExample();
      setTimeout(() => ShallowCopyExamples.arrayExample(), 100);
      setTimeout(() => ShallowCopyExamples.whenToUse(), 200);
    }, 100);
  };

  const runDeepCopyExample = () => {
    clearOutput();
    logToScreen('Running Deep Copy Examples...\n');
    console.log = (message: any) => logToScreen(String(message));
    
    setTimeout(() => {
      DeepCopyExamples.basicExample();
      setTimeout(() => DeepCopyExamples.jsonLimitations(), 100);
    }, 100);
  };

  const runDeepCopyProblems = () => {
    clearOutput();
    logToScreen('Running Deep Copy Problem Cases...\n');
    console.log = (message: any) => logToScreen(String(message));
    
    setTimeout(() => {
      DeepCopyExamples.circularReferenceProblem();
      setTimeout(() => DeepCopyExamples.deepNestingProblem(), 200);
    }, 100);
  };

  const runShallowComparison = () => {
    clearOutput();
    logToScreen('Running Shallow Comparison Examples...\n');
    console.log = (message: any) => logToScreen(String(message));
    
    setTimeout(() => {
      ComparisonExamples.shallowBasics();
      setTimeout(() => ComparisonExamples.shallowWithNested(), 100);
    }, 100);
  };

  const runDeepComparison = () => {
    clearOutput();
    logToScreen('Running Deep Comparison Examples...\n');
    console.log = (message: any) => logToScreen(String(message));
    
    setTimeout(() => {
      ComparisonExamples.deepComparison();
      setTimeout(() => ComparisonExamples.arrayComparison(), 100);
      setTimeout(() => ComparisonExamples.dateComparison(), 200);
    }, 100);
  };

  const runFlatteningExample = () => {
    clearOutput();
    logToScreen('Running Flattening Alternative Examples...\n');
    console.log = (message: any) => logToScreen(String(message));
    
    setTimeout(() => {
      FlatteningExample.traditionalCopyFails();
      setTimeout(() => FlatteningExample.flatteningApproach(), 200);
      setTimeout(() => FlatteningExample.summary(), 400);
    }, 100);
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View style={styles.header}>
        <Text style={[styles.headerTitle, textStyle]}>
          Copy & Comparison Demo
        </Text>
        <Text style={[styles.headerSubtitle, textStyle]}>
          Deep Copy vs Shallow Copy
        </Text>
      </View>

      <ScrollView style={backgroundStyle} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={[styles.section, cardStyle]}>
            <Text style={[styles.sectionTitle, textStyle]}>
              Shallow Copy
            </Text>
            <Text style={[styles.sectionDescription, textStyle]}>
              Copies first level only. Nested properties share references.
            </Text>
            <DemoButton title="Run Examples" onPress={runShallowCopyExample} />
          </View>

          <View style={[styles.section, cardStyle]}>
            <Text style={[styles.sectionTitle, textStyle]}>Deep Copy</Text>
            <Text style={[styles.sectionDescription, textStyle]}>
              Creates independent copy of entire structure.
            </Text>
            <DemoButton title="Run Examples" onPress={runDeepCopyExample} />
          </View>

          <View style={[styles.section, cardStyle]}>
            <Text style={[styles.sectionTitle, textStyle]}>
              Deep Copy Problems
            </Text>
            <Text style={[styles.sectionDescription, textStyle]}>
              Circular references, deep nesting, and limitations.
            </Text>
            <DemoButton
              title="Show Problems"
              onPress={runDeepCopyProblems}
            />
          </View>

          <View style={[styles.section, cardStyle]}>
            <Text style={[styles.sectionTitle, textStyle]}>
              Shallow Comparison
            </Text>
            <Text style={[styles.sectionDescription, textStyle]}>
              Compares references and first level properties.
            </Text>
            <DemoButton
              title="Run Examples"
              onPress={runShallowComparison}
            />
          </View>

          <View style={[styles.section, cardStyle]}>
            <Text style={[styles.sectionTitle, textStyle]}>
              Deep Comparison
            </Text>
            <Text style={[styles.sectionDescription, textStyle]}>
              Recursively compares all nested properties.
            </Text>
            <DemoButton title="Run Examples" onPress={runDeepComparison} />
          </View>

          <View style={[styles.section, cardStyle]}>
            <Text style={[styles.sectionTitle, textStyle]}>
              Alternatives & Solutions
            </Text>
            <Text style={[styles.sectionDescription, textStyle]}>
              Flattening approach for extreme cases.
            </Text>
            <DemoButton
              title="Show Alternatives"
              onPress={runFlatteningExample}
            />
          </View>

          <View style={[styles.outputSection, cardStyle]}>
            <View style={styles.outputHeader}>
              <Text style={[styles.outputTitle, textStyle]}>Output</Text>
              <DemoButton title="Clear" onPress={clearOutput} />
            </View>
            <ScrollView
              style={styles.outputBox}
              nestedScrollEnabled={true}>
              <Text style={[styles.outputText, textStyle]}>{output}</Text>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.7,
  },
  content: {
    padding: 16,
  },
  section: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionDescription: {
    fontSize: 14,
    marginBottom: 12,
    lineHeight: 20,
  },
  outputSection: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  outputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  outputTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  outputBox: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    maxHeight: 300,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  outputText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
});

export default App;
