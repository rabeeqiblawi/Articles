# Choroid Input System
## A VR Body Pose and Gesture Detection System

In the realm of virtual reality, creating lifelike interactions relies on accurate gesture recognition. Today, I'm thrilled to announce the open-sourcing of a fundamental component from my VR project, "Come-Fly-With-Me." Let's delve into the VR Body Pose and Gesture Detection System—a tool designed to streamline gesture creation and improve VR experiences.

### Core Features

#### Simplified Gesture Creation
The system introduces abstract classes for poses and gestures, simplifying the process of defining and recognizing different body movements. This abstraction frees developers from complex detection algorithms, enabling them to focus on crafting engaging interactions effortlessly.

#### Unity's Input System Integration
A standout feature is its seamless integration with Unity's new input system. This integration treats poses and gestures as keyboard inputs and vice versa. This practical approach accelerates testing and prototyping, allowing developers to iterate on interactions quickly.

#### Efficient Debugging
Traditional debugging in VR often disrupts the flow. To mitigate this, our system includes a sound-based debugging mechanism. Developers can now hear recognized poses and gestures as audio cues, eliminating the need for constant headset removal and improving the debugging process.

#### Streamlined Complex Gesture Detection
The system employs a composite gesture detector to recognize intricate gestures. For example, when a user performs a multi-part motion, the feature waits for multiple poses and gestures to occur in a certain time frame, treating them as a single gesture.

### Installing the System

1. **Open Unity**: Launch Unity and open the project you're working on. Ensure that you're using a compatible version of Unity.
2. **Access Package Manager**: In Unity's top menu, navigate to "Window" and select "Package Manager." This will open the Package Manager window.
3. **Add a Package**: Inside the Package Manager window, click the "Add package from git URL" button. This is usually represented by a '+' icon.
4. **Paste Package URL**: A field will appear where you can paste the URL of the VR Body Pose and Gesture Detection System package.
5. **Install Package**: After pasting the URL, hit the "Add" button. Unity's Package Manager will now work its magic and install the package directly into your project.

### Usage

#### Setting up the system
This system works with any 6DOF tracking system, whether you are using Oculus, SteamVR, or any other VR rig. To start, all you have to do is add the VR Pose Input Manager to your scene; this script is a Singleton so it's preferred to be on your rig itself. Reference the tracked devices to this script, currently, this package only supports the head and the controllers and doesn't support full body tracking…

![image](https://raw.githubusercontent.com/rabeeqiblawi/Articles/master/choroid_input_system/1_HL2QWGYx6JSrrih5uPawUg.png)

For this system to work you should add a Velocity estimator script to each of the tracked devices, this script calculates the velocity of tracked devices based on the distance difference between frames.
![image](https://raw.githubusercontent.com/rabeeqiblawi/Articles/master/choroid_input_system/1_wA_tGkblA6RuqvjeB6ixQw.png)

#### Creating a pose
To create a pose, all you need is to create a script that extends the `VRPose` class and set up the condition for that pose to happen.

Example:
```csharp
public class GlidePose : VRPose
{
    public float MinDistance = 0.5f;

    public override bool PoseCondition
    {
        get
        {
            return Vector3.Distance(LeftControllerTransform.position, RightControllerTransform.position) > MinDistance;
        }
    }
}
```
Usage:
```csharp
[SerializeField] private InputDetector _glidingPose;

void Start()
{
    _flap.OnActionPerformed.AddListener(() => {/* REACT TO GESTURE */});
}
```

#### Creating a gesture
Inherit from `VRGesture`: Create a new script for your spell gesture interaction and inherit from the `VRGesture` class. This will provide the foundation for gesture detection and handling.

```csharp
public class SpellGesture : VRGesture
{
    private bool isCastingSpell = false;

    public override void ResetAttributes(bool resetPhaseDirectly = false)
    {
        // Reset gesture attributes and phases
        // Optionally reset the phase directly if resetPhaseDirectly is true
    }

    void Update()
    {
        // Detect and handle the gesture logic
        if (/* Logic for detecting the specific gesture pattern */)
        {
            isCastingSpell = true;
            // Cast the fireball spell or trigger relevant action
        }
        else
        {
            isCastingSpell = false;
        }
    }
}
```
You can use gestures and poses in the same way as both extend `Input Detector`.

#### Composite Gestures/Poses
One of the important features of this system is creating Composite Gestures. For example, detecting a flap action requires each arm to do a separate gesture.

![image](https://raw.githubusercontent.com/rabeeqiblawi/Articles/master/choroid_input_system/1_tOrV9p3guZE3xyylFHCbPA)

#### Unity Input Wrapper
An important feature of this system is treating gestures the same way as VR poses and gestures. To do this, just add `UnityInputWrapper` script to any game object and you will be able to add an input action.

![image](https://raw.githubusercontent.com/rabeeqiblawi/Articles/master/choroid_input_system/1_vzf14vevOIp8GqDx8ZOR0w)

This feature helps rapid prototyping where gestures and flaps are replaced with keyboard shortcuts.