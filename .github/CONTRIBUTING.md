### Submitting Pull Requests

We'd love for you to contribute to our source code and to make this package even better than it is
today! Here are the guidelines we'd like you to follow:

 - [Issues and Bugs](#issue)
 - [Feature Requests](#feature)
 - [Coding Rules](#rules)

## <a name="issue"></a> Found an Issue?

If you find a bug in the source code or a mistake in the documentation, you can help us by
submitting an issue to our [GitHub Repository][github]. Even better you can submit a Pull Request
with a fix. But first search if the issue is already described!

If not create a new issue:

* Tell about your environment:
  * NodeJS version
  * Yarn version
  * Environment setup
* Describe your issue
  * describe your steps leading to the issue
  * attach error logs or screenshots
  * if possible provide test case or screenshots

## <a name="feature"></a> Want a Feature?

You can request a new feature by submitting an issue to our [GitHub Repository][github].

Please follow these basic steps to simplify pull request reviews - if you don't you'll probably just be asked to anyway.**

* Please rebase your branch against the current develop, use the **develop** for pull requests
* Please ensure that the test suite passes **and** that code is lint free before submitting a PR by running:
 * ```yarn run test```
* If you've added new functionality, **please** include tests which validate its behaviour
* Make reference to possible [issues](https://github.com/aboutyou/storefront-ts/issues) on PR comment

## <a name="rules"></a> Coding Rules

To ensure consistency throughout the source code, keep these rules in mind as you are working:

* All features or bug fixes **must be tested** by one or more unit tests.
* All public API methods **must be documented** with jsdoc.
