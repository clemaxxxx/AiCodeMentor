//Interface selon les record dans le package DTO

export interface DescriptionInput {
  description: string;
  teachername : string | null;
}

export interface DescriptionOutput {
  orginaldes: string;
  transformtext: string;
}

export interface ResultDisplayProps {
  responseText: DescriptionOutput;
}

export interface UserLoginInput {
    username: string;
    role: string | undefined;
}

export interface TestsSummary {
    id: number;
    test: string;
    input: string;
    output: string;
    hint: string;
}

export interface ConceptSummary {
    id: number;
    theme: string;
}

export interface ExampleSolutionSummary {
    id: number;
    code: string;
    explication: string;
}



export interface ExerciseSummary {
    id : number
    title: string;
    description : string;
    statement : string;
    difficulty : string;
    teachername : string | null;
    tests: TestsSummary[];
    concept: ConceptSummary | null;
    exemple: ExampleSolutionSummary | null;
}

export interface CategorizedExercices {
    name : string;
    exercises : ExerciseSummary[];
}


export interface UserData {
    id : number;
    name : string;
    exercises : ExerciseSummary[] | null;
}

export interface UserLoginOutput {
    user: UserData;
    role : string;
    token: string;
}

export interface TestResult {
    test : TestsSummary
    passed : boolean;
    result : string
}

export interface ExecutionResponse {
    results : TestResult[];
    allPased : boolean;
    }

export interface AiConcept {
  theme: string;
}

export interface AiExampleSolution {
  code: string;
  explication: string;
}

export interface AiTest {
  test: string;
  input: string;
  output: string;
  hint: string;
}

export interface AiGeneratedExercise {
  title: string;
  description: string;
  statement: string;
  difficulty: string;
  tests: AiTest[];
  concept: AiConcept;
  exemple: AiExampleSolution;
}

export interface ExerciseResponse {
    sessionId: string;
    exercise: AiGeneratedExercise;
}

export interface RefineInput {
    sessionId: string;
    instruction: string;
    teachername?: string | null;
}