import { useState } from 'react';

type Scene = {
  id: string;
  text: string;
  choices: { text: string; next: string }[];
};

const SCENES: Record<string, Scene> = {
  start: {
    id: 'start',
    text: "You wake up in an abandoned Kubernetes cluster. Pods are crashing everywhere. What do you do?",
    choices: [
      { text: "kubectl get pods", next: "check_pods" },
      { text: "Run away", next: "run_away" },
      { text: "Debug the logs", next: "debug_logs" }
    ]
  },
  check_pods: {
    id: 'check_pods',
    text: "You see 47 pods in CrashLoopBackOff state. The CPU usage is at 99%. A mysterious error appears: 'OOMKilled'",
    choices: [
      { text: "Increase memory limits", next: "increase_memory" },
      { text: "Scale down", next: "scale_down" },
      { text: "Call for help", next: "call_help" }
    ]
  },
  run_away: {
    id: 'run_away',
    text: "You tried to run but you're trapped in the namespace. The only way out is through. Game Over.",
    choices: [
      { text: "Start over", next: "start" }
    ]
  },
  debug_logs: {
    id: 'debug_logs',
    text: "The logs reveal a rogue container mining crypto! You found the culprit.",
    choices: [
      { text: "Delete the deployment", next: "win" },
      { text: "Report to security", next: "report" }
    ]
  },
  increase_memory: {
    id: 'increase_memory',
    text: "Memory increased! Pods are starting... but now the bill is $10,000/month. Management is not happy.",
    choices: [
      { text: "Optimize the code", next: "optimize" },
      { text: "Start over", next: "start" }
    ]
  },
  scale_down: {
    id: 'scale_down',
    text: "You scaled to 0 replicas. The app is down. Users are angry. Game Over.",
    choices: [
      { text: "Start over", next: "start" }
    ]
  },
  call_help: {
    id: 'call_help',
    text: "Senior DevOps arrives. Together you fix the issue by adjusting resource quotas. Team win!",
    choices: [
      { text: "Start over", next: "start" }
    ]
  },
  report: {
    id: 'report',
    text: "Security team takes over. You get a bonus for finding the breach! You win!",
    choices: [
      { text: "Start over", next: "start" }
    ]
  },
  optimize: {
    id: 'optimize',
    text: "After 3 days of refactoring, the app uses 10x less memory. You're a hero! You win!",
    choices: [
      { text: "Start over", next: "start" }
    ]
  },
  win: {
    id: 'win',
    text: "The malicious deployment is deleted! The cluster returns to normal. You saved the day! 🎉",
    choices: [
      { text: "Start over", next: "start" }
    ]
  }
};

export const AdventureGame = () => {
  const [currentScene, setCurrentScene] = useState<string>('start');
  const [history, setHistory] = useState<string[]>(['start']);

  const scene = SCENES[currentScene];

  const handleChoice = (nextScene: string) => {
    setCurrentScene(nextScene);
    setHistory([...history, nextScene]);
  };

  return (
    <div className="flex items-center justify-center h-full bg-background/90 p-4">
      <div className="bg-card/50 backdrop-blur-sm border border-primary/30 rounded-lg p-8 max-w-2xl w-full">
        <h2 className="text-2xl font-bold text-primary mb-6">Kubernetes Adventure</h2>
        
        <div className="mb-8">
          <p className="text-lg text-foreground/90 leading-relaxed mb-6">
            {scene.text}
          </p>
          
          <div className="space-y-3">
            {scene.choices.map((choice, index) => (
              <button
                key={index}
                onClick={() => handleChoice(choice.next)}
                className="w-full px-4 py-3 bg-background/50 hover:bg-primary/20 border border-primary/30 hover:border-primary rounded text-left transition-all text-foreground/80 hover:text-foreground"
              >
                → {choice.text}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-border/30">
          <p className="text-xs text-muted-foreground">
            Steps taken: {history.length}
          </p>
        </div>
      </div>
    </div>
  );
};
